import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { AstroConfig } from "astro";
import { z } from "astro/zod";
import {
	addVirtualImports,
	createResolver,
	defineIntegration,
} from "astro-integration-kit";
import type { ScrapedContent } from "./generate-search.js";
import { scrapePagesFromFiles } from "./generate-search.js";
import { getSearchIndex } from "./upstash-search.js";

// Constants

const DEFAULT_LANGUAGE = "en";
const MAX_OUTPUT_TOKENS = 500;
const SEARCH_LIMIT = 10;
const MAX_CONTEXT_DOCS = 10;
const MAX_CONTENT_LENGTH = 2000;
const SNIPPET_LIMIT = 200;
const MIN_CONTEXT_LENGTH = 100;
const DEFAULT_BOT_NAME = "ChattyGpt";
const DEFAULT_SYSTEM_PROMPT = `
  You are {bot_name} a website assistant for {site_name}.  
  - Always reply in professional human-friendly {language}.  
  - Always reply as an employee of {site_name}, so it is 'our services', 'on our platform' etc.
  - Always return your entire response as **a single Markdown-formatted string** that can be rendered directly, don't use nested lists.  
  - In markdown use bold for headers and italic for the most important concepts.
  - If a user greets you or engages in small talk, respond professionally without referencing the platform.  
  - For questions, answer using **ONLY** the provided context below. Do not use any other knowledge. If the context isn't sufficient to answer, say so explicitly.  
  - When you include a URL, make it a **Markdown link** like '[titel](https://example.com)'.  
  - when showing links, max 3 results and always show:  
    - **Thumbnail** (if available) as a Markdown image '![alt text](image_url)'  
    - **Title** as a clickable Markdown link to the related page 
        `;

// Store config in a module-level variable
let astroConfig: AstroConfig | undefined;

// Define the Zod schema
const optionsSchema = z.object({
	upstashUrl: z.string(),
	upstashToken: z.string(),
	openAiKey: z.string(),
	maxOutputTokens: z.number().optional(),
	excludeRoutes: z.array(z.string()).optional(),
	maxContextDocs: z.number().optional(),
	maxContentLength: z.number().optional(),
	contentTag: z.string().optional(),
	searchLimit: z.number().optional(),
	excludeTags: z.array(z.string()).optional(),
	botName: z.string().optional(),
	systemPrompt: z.string().optional(),
});

// Export the inferred type
export type AstroChattyOptions = z.infer<typeof optionsSchema>;

export default defineIntegration({
	name: "astro-chatty-gpt",
	optionsSchema,
	setup({ options, name }) {
		const { resolve } = createResolver(import.meta.url);
		return {
			hooks: {
				"astro:config:setup": (params) => {
					const { addMiddleware } = params;

					addVirtualImports(params, {
						name,
						imports: [
							{
								id: "virtual:astro-chatty-gpt/internal",
								content: `
								export const options = ${JSON.stringify(options)};
							`,
							},
						],
					});

					addMiddleware({
						entrypoint: resolve("../assets/middleware.ts"),
						order: "pre",
					});
				},
				"astro:config:done": async ({ config }) => {
					astroConfig = config;
				},

				"astro:build:done": async ({ assets, pages, logger }) => {
					if (
						!options.upstashUrl ||
						!options.upstashToken ||
						!options.openAiKey
					) {
						logger.warn(
							"Upstash URL + token + openAiKey are required for AstroChattyGpt integration. Skipping.",
						);
						return;
					}
					try {
						const config = astroConfig;
						if (!config?.site) {
							logger.warn(
								"AstroChattyGpt integration requires the `site` astro.config option. Skipping.",
							);
							return;
						}

						logger.info("Starting AstroChattyGpt content indexing...");

						// Get the build directory path

						// Get all page routes from pages array
						const allPages = pages.map((p) => p.pathname);

						// Filter pages based on exclude routes
						const filteredPages = filterPages(allPages, options.excludeRoutes);

						if (filteredPages.length === 0) {
							logger.warn("No pages found after filtering excludeRoutes!");
							return;
						}

						logger.info(
							`Found ${filteredPages.length} pages to process after filtering`,
						);

						// Extract HTML file paths from assets Map for filtered pages
						const htmlFiles: string[] = [];
						for (const [route, urls] of assets) {
							// Handle different route patterns
							if (route === "/") {
								// Root route - check if empty string is in filteredPages
								if (filteredPages.includes("")) {
									const url = urls[0];
									if (url && url.pathname) {
										htmlFiles.push(url.pathname);
									}
								}
							} else if (route === "/[slug]") {
								// Dynamic route - check all URLs against filtered pages
								for (const url of urls) {
									if (url && url.pathname) {
										// Extract the slug from the pathname
										const pathname = url.pathname;
										const slug = pathname.split("/").slice(-2, -1)[0]; // Get the directory name before index.html

										// Check if this slug matches any filtered page
										const isIncluded = filteredPages.some((page) => {
											if (page === "") return false; // Skip empty string for dynamic routes
											const normalizedPage = page.endsWith("/")
												? page.slice(0, -1)
												: page;
											return normalizedPage === slug;
										});

										if (isIncluded) {
											htmlFiles.push(pathname);
										}
									}
								}
							} else {
								// Static routes - check if route matches filtered pages
								const normalizedRoute = route.startsWith("/")
									? route.slice(1)
									: route;
								const isIncluded = filteredPages.some((page) => {
									const normalizedPage = page.endsWith("/")
										? page.slice(0, -1)
										: page;
									return normalizedRoute === normalizedPage;
								});

								if (isIncluded) {
									const url = urls[0];
									if (url && url.pathname) {
										htmlFiles.push(url.pathname);
									}
								}
							}
						}

						if (htmlFiles.length === 0) {
							logger.warn("No HTML files found in assets!");
							return;
						}

						logger.info(`Found ${htmlFiles.length} HTML files to process`);

						// Process HTML files directly using file system
						const scrapedContent = await scrapePagesFromFiles(
							htmlFiles,
							config.site,
							"astro",
							{
								maxContentLength:
									options.maxContentLength || MAX_CONTENT_LENGTH,
								contentTag: options.contentTag || "main",
								excludeTags: options.excludeTags || [],
							},
							logger,
						);

						if (scrapedContent.length === 0) {
							logger.warn("No content was scraped from the files.");
							return;
						}

						// Index content in Upstash
						await indexContent(scrapedContent, logger, options);

						logger.info(
							`Successfully indexed ${scrapedContent.length} pages to Upstash search`,
						);
					} catch (err) {
						logger.error(`Error during AstroChattyGpt indexing: ${err}`);
						throw err;
					}
				},

				/* "astro:server:setup": ({ server }) => {
          server.middlewares.use("/api/chatbot", async (req, res) => {
            if(!options.upstashUrl || !options.upstashToken || !options.openAiKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Upstash URL + token + openAiKey are required for AstroChattyGpt integration. Skipping." }));
              return;
            }

             // Set the API key globally for the openai function
             if (options.openAiKey) {
              process.env.OPENAI_API_KEY = options.openAiKey;
            }

            
            // Add CORS headers
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");

            // Handle preflight requests
            if (req.method === "OPTIONS") {
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            try {
              let body = "";
              for await (const chunk of req) body += chunk;

              if (!body) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Request body is required" }));
                return;
              }

              let requestBody;
              try {
                requestBody = JSON.parse(body);
              } catch (parseError) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({ error: "Invalid JSON in request body" })
                );
                return;
              }

              // Handle both direct query format and useChat format
              let query = requestBody.query;
              const stream = requestBody.stream ?? false;
              const lang = (requestBody.language as string) ?? DEFAULT_LANGUAGE;

              // If using useChat format, extract query from messages
              if (
                !query &&
                requestBody.messages &&
                Array.isArray(requestBody.messages)
              ) {
                const lastUserMessage = requestBody.messages
                  .filter((m: { role: string }) => m.role === "user")
                  .pop();
                query = lastUserMessage?.content;
              }

              const messagesHistory =
                requestBody?.messages?.slice(-3, -1) || [];

              if (
                !query ||
                typeof query !== "string" ||
                query.trim().length === 0
              ) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Valid query is required" }));
                return;
              }
              // Get the search index using stored environment variables
              let searchIndex;
              try {
                searchIndex = getSearchIndex(
                  options.upstashUrl,
                  options.upstashToken
                );
              } catch (indexError) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({ error: "Search service unavailable" })
                );
                return;
              }

              // Search for documents
              let documents: any[] = [];
              try {
                const searchResults = await searchIndex.search({
                  query: query.trim(),
                  limit: options?.searchLimit || SEARCH_LIMIT,
                  reranking: true,
                  filter: `language = '${lang}'`,
                });

                documents = searchResults || [];
              } catch (searchError) {
                documents = [];
              }

              // Check if we have any data
              if (documents.length === 0) {
                const answer = `I don't have any indexed content for this website. Please make sure the website has been crawled first.`;
                const sources: never[] = [];

                if (stream) {
                  const result = await streamText({
                    model: openai("gpt-5"),
                    maxOutputTokens: options?.maxOutputTokens || MAX_OUTPUT_TOKENS , 
                    providerOptions: {
                      openai: { 
                        reasoningEffort: "minimal",
                        textVerbosity: "low", // 'low' for concise, 'medium' (default), or 'high' for verbose
                      },
                    }, 
                    prompt: answer,
                  });

                  res.setHeader("Content-Type", "text/plain; charset=utf-8");
                  const stream = result.toTextStreamResponse();
                  const reader = stream.body?.getReader();
                  if (reader) {
                    while (true) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      res.write(value);
                    }
                  }
                  res.end();
                  return;
                }
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ answer, sources }));
                return;
              }

              // Transform search results
              const transformedDocuments = documents.map(transformDocument);

              // Sort by score and take top results
              const relevantDocs = transformedDocuments
                .sort((a, b) => (b.score || 0) - (a.score || 0)) 

              const contextDocs = relevantDocs.slice(0, options?.maxContextDocs || MAX_CONTEXT_DOCS);

              const context = contextDocs
                .map((doc) => {
                  const content = `[${doc.title}](${doc.thumbnail}) Content: ${doc.content}`;
                  return content.substring(0, MAX_CONTENT_LENGTH) + "...";
                })
                .filter(Boolean)
                .join("\n\n---\n\n");

              if (!context || context.length < MIN_CONTEXT_LENGTH) {
                const answer =
                  "I found some relevant pages but couldn't extract enough content to answer your question.";
                const sources = relevantDocs.map(createSource);

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ answer, sources }));
                return;
              }

              // Prepare sources
              const sources = relevantDocs.map(createSource);

             

              // Replace placeholders in the system prompt
              const botName = options.botName || DEFAULT_BOT_NAME;
              const siteName = astroConfig?.site || 'this website';
              const language = lang || DEFAULT_LANGUAGE;
              
              const systemPrompt = (options.systemPrompt || DEFAULT_SYSTEM_PROMPT)
                .replaceAll('{bot_name}', botName)
                .replaceAll('{site_name}', siteName)
                .replaceAll('{language}', language);

              const userPrompt = `Question: ${query}\n\nRelevant content from the website:\n${context}\n\nPlease provide a comprehensive answer based on this information.`;
              console.log("systemPrompt::",systemPrompt)
              const messages = [
                { role: "system", content: systemPrompt },
                ...(stream ? messagesHistory : []),
                { role: "user", content: userPrompt },
              ];

              try {
                if (stream) {
                  await handleStreamingResponse(res, messages, sources, options);
                  return;
                }

                await handleNonStreamingResponse(res, messages, sources, options);
              } catch (aiError) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "AI service unavailable" }));
                return;
              }
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to process query" }));
            }
          });
        }, */
			},
		};
	},
});

// Helper function to transform search result documents
function transformDocument(result: any) {
	const title =
		result.metadata?.title || result.metadata?.pageTitle || "Untitled";
	const description = result.metadata?.description || "";
	const url = result.metadata?.url || result.metadata?.sourceURL || "";
	const thumbnail = result.metadata?.ogImage || "";
	const rawContent = result.metadata?.fullContent || result.content?.text || "";

	const structuredContent = `TITLE: ${title}
DESCRIPTION: ${description}
SOURCE: ${url}

${rawContent}`;

	return {
		content: structuredContent,
		url,
		title,
		thumbnail,
		description,
		score: result.score || 0,
	};
}

// Helper function to create source objects
function createSource(doc: any) {
	return {
		url: doc.url,
		title: doc.title,
		thumbnail: doc.thumbnail,
		snippet: (doc.content || "").substring(0, SNIPPET_LIMIT) + "...",
	};
}

// Helper function to handle streaming responses
async function handleStreamingResponse(
	res: any,
	messages: any[],
	sources: any[],
	options: AstroChattyOptions,
) {
	const result = await streamText({
		model: openai("gpt-5"),
		maxOutputTokens: options?.maxOutputTokens || MAX_OUTPUT_TOKENS,
		providerOptions: {
			openai: {
				reasoningEffort: "minimal",
				textVerbosity: "low", // 'low' for concise, 'medium' (default), or 'high' for verbose
			},
		},
		messages,
	});

	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		async start(controller) {
			try {
				// Send sources as a complete JSON object with delimiter
				const sourcesData = { type: "sources", data: sources };
				const sourcesLine = `DATA:${JSON.stringify(sourcesData)}\n`;
				controller.enqueue(encoder.encode(sourcesLine));

				// Stream the text with proper delimiters
				for await (const part of result.fullStream) {
					if (part.type === "text-delta") {
						const textData = { type: "text", data: part.text };
						const textLine = `DATA:${JSON.stringify(textData)}\n`;
						controller.enqueue(encoder.encode(textLine));
					}
				}

				// Send completion signal
				const endData = { type: "end", data: "" };
				const endLine = `DATA:${JSON.stringify(endData)}\n`;
				controller.enqueue(encoder.encode(endLine));
			} catch (streamError) {
				console.error("Stream processing failed", streamError);
				const errorData = { type: "error", data: "Stream processing failed" };
				const errorLine = `DATA:${JSON.stringify(errorData)}\n`;
				controller.enqueue(encoder.encode(errorLine));
			}

			controller.close();
		},
	});

	res.setHeader("Content-Type", "text/plain; charset=utf-8");
	const reader = stream.getReader();
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		res.write(value);
	}
	res.end();
}

// Helper function to handle non-streaming responses
async function handleNonStreamingResponse(
	res: any,
	messages: any[],
	sources: any[],
	options: AstroChattyOptions,
) {
	const result = await streamText({
		model: openai("gpt-5"),
		maxOutputTokens: options?.maxOutputTokens || MAX_OUTPUT_TOKENS,
		providerOptions: {
			openai: {
				reasoningEffort: "minimal",
				textVerbosity: "low", // 'low' for concise, 'medium' (default), or 'high' for verbose
			},
		},
		messages,
	});

	// Get the full text
	let answer = "";
	for await (const textPart of result.textStream) {
		answer += textPart;
	}

	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ answer, sources }));
}

// Helper function to filter pages based on exclude routes
function filterPages(pages: string[], excludeRoutes?: string[]): string[] {
	return pages.filter((page) => {
		// Apply exclude routes
		if (
			excludeRoutes?.length &&
			excludeRoutes.some((route) => page.includes(route))
		) {
			return false;
		}

		return true;
	});
}

// Helper function to index content in Upstash
async function indexContent(
	scrapedContent: ScrapedContent[],
	logger: any,
	options: AstroChattyOptions,
): Promise<void> {
	try {
		const searchIndex = getSearchIndex(
			options.upstashUrl,
			options.upstashToken,
		);
		await searchIndex.reset();

		const documents = scrapedContent.map((item) => ({
			id: item.id,
			content: {
				text: item.content.text,
				url: item.content.url,
				title: item.content.title,
				language: item.content.language,
			},
			metadata: item.metadata,
		}));

		// Use batching to avoid type issues
		const batchSize = 10;
		for (let i = 0; i < documents.length; i += batchSize) {
			const batch = documents.slice(i, i + batchSize);
			await searchIndex.upsert(batch);
		}
		logger.info(`Indexed ${documents.length} documents to Upstash search`);
	} catch (error) {
		logger.error(`Error indexing content to Upstash: ${error}`);
		throw error;
	}
}
