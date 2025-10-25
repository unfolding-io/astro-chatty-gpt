import type { AstroConfig, AstroIntegrationLogger } from "astro";
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
const MAX_CONTENT_LENGTH = 2000;

// Store config in a module-level variable
let astroConfig: AstroConfig | undefined;

// Helper function to filter HTML files based on exclude routes
function filterHtmlFiles(
	htmlFiles: string[],
	excludeRoutes: string[],
	logger: AstroIntegrationLogger,
): string[] {
	if (!excludeRoutes || excludeRoutes.length === 0) {
		return htmlFiles;
	}

	const filteredFiles: string[] = [];

	for (const filePath of htmlFiles) {
		// Convert file path to URL path for comparison
		// Remove build directory prefix and convert to URL format
		const urlPath = filePath
			.replace(/^.*\/dist\//, "/") // Remove everything up to and including /dist/
			.replace(/\/index\.html$/, "/") // Convert /index.html to /
			.replace(/\.html$/, "/"); // Convert other .html files to /path/

		// Check if this URL should be excluded
		const shouldExclude = excludeRoutes.some((excludePattern) => {
			// Support glob patterns
			if (excludePattern.includes("*")) {
				const regex = new RegExp(`^${excludePattern.replace(/\*/g, ".*")}$`);
				return regex.test(urlPath);
			}
			// Support exact matches and prefix matching
			return urlPath === excludePattern || urlPath.startsWith(excludePattern);
		});

		if (!shouldExclude) {
			filteredFiles.push(filePath);
		} else {
			logger.info(`Excluding ${urlPath} (matched exclude pattern)`);
		}
	}

	return filteredFiles;
}

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

				"astro:build:done": async ({ assets, logger }) => {
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

						// Extract all HTML files from assets map
						const htmlFiles: string[] = [];

						for (const [, urls] of assets) {
							for (const url of urls) {
								if (url?.pathname?.endsWith(".html")) {
									htmlFiles.push(url.pathname);
								}
							}
						}

						if (htmlFiles.length === 0) {
							logger.warn("No HTML files found in assets!");
							return;
						}

						logger.info(`Found ${htmlFiles.length} HTML files in assets`);

						// Filter HTML files based on exclude routes
						const filteredHtmlFiles = filterHtmlFiles(
							htmlFiles,
							options.excludeRoutes || [],
							logger,
						);

						if (filteredHtmlFiles.length === 0) {
							logger.warn("No HTML files found after filtering excludeRoutes!");
							return;
						}

						logger.info(
							`Found ${filteredHtmlFiles.length} HTML files to process after filtering`,
						);

						// Process HTML files directly using file system
						const scrapedContent = await scrapePagesFromFiles(
							filteredHtmlFiles,
							config.site,
							logger,
							"astro",
							{
								maxContentLength:
									options.maxContentLength || MAX_CONTENT_LENGTH,
								contentTag: options.contentTag || "main",
								excludeTags: options.excludeTags || [],
							},
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
			},
		};
	},
});

// Helper function to index content in Upstash
async function indexContent(
	scrapedContent: ScrapedContent[],
	logger: AstroIntegrationLogger,
	options: AstroChattyOptions,
): Promise<void> {
	try {
		const searchIndex = getSearchIndex(
			options.upstashUrl,
			options.upstashToken,
		);
		if (!searchIndex) {
			throw new Error("Failed to initialize search index");
		}
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
