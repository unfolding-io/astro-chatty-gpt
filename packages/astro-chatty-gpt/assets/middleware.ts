import { defineMiddleware } from "astro:middleware";
// @ts-expect-error - Virtual import from astro-chatty-gpt integration
import { options } from "virtual:astro-chatty-gpt/internal";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getSearchIndex } from "../src/upstash-search.js";

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

export const onRequest = defineMiddleware(async (ctx, next) => {
	if (ctx.url.pathname === "/api/search") {
		if (!options.upstashUrl || !options.upstashToken) {
			return new Response(
				JSON.stringify({
					error: "Upstash URL + token are required for search functionality.",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Handle preflight requests
		if (ctx.request.method === "OPTIONS") {
			return new Response(null, { status: 200 });
		}

		if (ctx.request.method !== "GET" && ctx.request.method !== "POST") {
			return new Response(JSON.stringify({ error: "Method not allowed" }), {
				status: 405,
				headers: { "Content-Type": "application/json" },
			});
		}

		try {
			// Get search query from URL params or request body
			let query = "";
			if (ctx.request.method === "GET") {
				const url = new URL(ctx.request.url);
				query = url.searchParams.get("q") || "";
			} else {
				const body = await ctx.request.text();
				if (body) {
					const requestBody = JSON.parse(body);
					query = requestBody.query || "";
				}
			}

			if (!query || query.trim().length === 0) {
				return new Response(
					JSON.stringify({ error: "Search query is required" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			// Get the search index
			let searchIndex;
			try {
				searchIndex = getSearchIndex(options.upstashUrl, options.upstashToken);
			} catch (indexError) {
				return new Response(
					JSON.stringify({ error: "Search service unavailable" }),
					{
						status: 500,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			// Search for documents
			let documents: any[] = [];
			try {
				const searchResults = await searchIndex.search({
					query: query.trim(),
					limit: 20, // Top 20 results
					reranking: true,
				});

				documents = searchResults || [];
			} catch (searchError) {
				return new Response(JSON.stringify({ error: "Search failed" }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}

			// Transform results to the requested format
			const results = documents.map((doc) => ({
				title: doc.metadata?.title || doc.metadata?.pageTitle || "Untitled",
				description: doc.metadata?.description || "",
				thumbnail: doc.metadata?.ogImage || "",
				url: doc.metadata?.url || doc.metadata?.sourceURL || "",
				score: doc.score || 0,
			}));

			return new Response(
				JSON.stringify({
					ok: true,
					results,
					total: results.length,
					query: query.trim(),
				}),
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type",
					},
				},
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: "Failed to process search request" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
	}

	if (ctx.url.pathname === "/api/chatbot") {
		if (!options.upstashUrl || !options.upstashToken || !options.openAiKey) {
			return new Response(
				JSON.stringify({
					error:
						"Upstash URL + token + openAiKey are required for AstroChattyGpt integration. Skipping.",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Set the API key globally for the openai function
		if (options.openAiKey) {
			process.env.OPENAI_API_KEY = options.openAiKey;
		}

		// Add CORS headers
		const response = new Response();
		response.headers.set("Access-Control-Allow-Origin", "*");
		response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
		response.headers.set("Access-Control-Allow-Headers", "Content-Type");

		// Handle preflight requests
		if (ctx.request.method === "OPTIONS") {
			return new Response(null, { status: 200 });
		}

		if (ctx.request.method !== "POST") {
			return new Response(JSON.stringify({ error: "Method not allowed" }), {
				status: 405,
				headers: { "Content-Type": "application/json" },
			});
		}

		try {
			const body = await ctx.request.text();

			if (!body) {
				return new Response(
					JSON.stringify({ error: "Request body is required" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			let requestBody;
			try {
				requestBody = JSON.parse(body);
			} catch (parseError) {
				return new Response(
					JSON.stringify({ error: "Invalid JSON in request body" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			// Handle both direct query format and useChat format
			let query: string = requestBody.query;
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

			const messagesHistory = requestBody?.messages?.slice(-3, -1) || [];

			if (!query || typeof query !== "string" || query.trim().length === 0) {
				return new Response(
					JSON.stringify({ error: "Valid query is required" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			// Get the search index using stored environment variables
			let searchIndex;
			try {
				searchIndex = getSearchIndex(options.upstashUrl, options.upstashToken);
			} catch (indexError) {
				return new Response(
					JSON.stringify({ error: "Search service unavailable" }),
					{
						status: 500,
						headers: { "Content-Type": "application/json" },
					},
				);
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
						maxOutputTokens: options?.maxOutputTokens || MAX_OUTPUT_TOKENS,
						providerOptions: {
							openai: {
								reasoningEffort: "minimal",
								textVerbosity: "low", // 'low' for concise, 'medium' (default), or 'high' for verbose
							},
						},
						prompt: answer,
					});

					return new Response(result.toTextStreamResponse().body, {
						headers: { "Content-Type": "text/plain; charset=utf-8" },
					});
				}
				return new Response(JSON.stringify({ answer, sources }), {
					headers: { "Content-Type": "application/json" },
				});
			}

			// Transform search results
			const transformedDocuments = documents.map(transformDocument);

			// Sort by score and take top results
			const relevantDocs = transformedDocuments.sort(
				(a, b) => (b.score || 0) - (a.score || 0),
			);

			const contextDocs = relevantDocs.slice(
				0,
				options?.maxContextDocs || MAX_CONTEXT_DOCS,
			);

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

				return new Response(JSON.stringify({ answer, sources }), {
					headers: { "Content-Type": "application/json" },
				});
			}

			// Prepare sources
			const sources = relevantDocs.map(createSource);

			// Replace placeholders in the system prompt
			const botName = options.botName || DEFAULT_BOT_NAME;
			const siteName = ctx.site || "this website";
			const language = lang || DEFAULT_LANGUAGE;

			const systemPrompt = (options.systemPrompt || DEFAULT_SYSTEM_PROMPT)
				.replaceAll("{bot_name}", botName)
				.replaceAll("{site_name}", siteName)
				.replaceAll("{language}", language);

			const userPrompt = `Question: ${query}\n\nRelevant content from the website:\n${context}\n\nPlease provide a comprehensive answer based on this information.`;
			console.log("systemPrompt::", systemPrompt);
			const messages = [
				{ role: "system", content: systemPrompt },
				...(stream ? messagesHistory : []),
				{ role: "user", content: userPrompt },
			];

			try {
				if (stream) {
					return await handleStreamingResponse(messages, sources, options);
				}

				return await handleNonStreamingResponse(messages, sources, options);
			} catch (aiError) {
				return new Response(
					JSON.stringify({ error: "AI service unavailable" }),
					{
						status: 500,
						headers: { "Content-Type": "application/json" },
					},
				);
			}
		} catch (error) {
			return new Response(
				JSON.stringify({ error: "Failed to process query" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
	}

	return next();
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
	messages: any[],
	sources: any[],
	options: any,
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

	return new Response(stream, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}

// Helper function to handle non-streaming responses
async function handleNonStreamingResponse(
	messages: any[],
	sources: any[],
	options: any,
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

	return new Response(JSON.stringify({ answer, sources }), {
		headers: { "Content-Type": "application/json" },
	});
}
