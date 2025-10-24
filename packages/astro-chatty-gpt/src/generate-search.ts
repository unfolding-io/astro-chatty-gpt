import { readFileSync } from "node:fs";
import htmlToMarkdown from "@wcj/html-to-markdown";
import type { AstroIntegrationLogger } from "astro";
import { JSDOM } from "jsdom";

export interface ScrapedContent {
	id: string;
	content: {
		text: string;
		url: string;
		title: string;
		language: string;
	};
	metadata: {
		namespace: string;
		title: string;
		url: string;
		sourceURL: string;
		crawlDate: string;
		pageTitle: string;
		description?: string;
		favicon?: string;
		ogImage?: string;
		fullContent: string; // Clean markdown content
		headings?: string[];
		keywords?: string;
		author?: string;
	};
}

interface ScrapeOptions {
	maxContentLength?: number;
	contentTag?: string;
	excludeTags?: string[];
}

export async function scrapePages(
	pages: string[],
	siteUrl: string,
	namespace: string,
	logger: AstroIntegrationLogger,
	options: ScrapeOptions = {},
): Promise<ScrapedContent[]> {
	const results: ScrapedContent[] = [];

	const defaultOptions = {
		maxContentLength: 10000,
		contentTag: "main",
		excludeTags: [],
		...options,
	};

	for (let index = 0; index < pages.length; index++) {
		const page = pages[index];
		try {
			const fullUrl = new URL(page || "", siteUrl).href;
			logger.info(`Scraping: ${fullUrl}`);

			const response = await fetch(fullUrl);
			if (!response.ok) {
				logger.warn(`Failed to fetch ${fullUrl}: ${response.status}`);
				continue;
			}

			const html = await response.text();
			const scraped = await extractContent(
				html,
				fullUrl,
				namespace,
				index,
				defaultOptions,
			);

			if (scraped.metadata.fullContent.length > 0) {
				results.push(scraped);
			}
		} catch (error) {
			logger.warn(`Error scraping ${page}: ${error}`);
		}
	}

	return results;
}

// New function to scrape pages from file system (using assets)
export async function scrapePagesFromFiles(
	htmlFiles: string[],
	siteUrl: string,
	logger: any,
	namespace = "astro",
	options: ScrapeOptions = {},
): Promise<ScrapedContent[]> {
	const results: ScrapedContent[] = [];

	const defaultOptions = {
		maxContentLength: 10000,
		contentTag: "main",
		excludeTags: [],
		...options,
	};

	for (let index = 0; index < htmlFiles.length; index++) {
		const filePath = htmlFiles[index];
		if (!filePath) {
			logger.warn(`Skipping undefined file path at index ${index}`);
			continue;
		}

		try {
			//logger.info(`Reading file: ${filePath}`);
			const html = readFileSync(filePath, "utf-8");

			// Convert file path to URL
			// Extract route from file path (e.g., /about/index.html -> /about/)
			const route = filePath
				.replace(/.*\/dist/, "") // Remove everything up to /dist
				.replace(/\/index\.html$/, "/") // Convert /index.html to /
				.replace(/\.html$/, ""); // Remove .html extension

			const fullUrl = new URL(route || "/", siteUrl).href;

			const scraped = await extractContent(
				html,
				fullUrl,
				namespace,
				index,
				defaultOptions,
			);

			if (scraped.metadata.fullContent.length > 0) {
				results.push(scraped);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			logger.warn(`Error processing file ${filePath}: ${errorMessage}`);
		}
	}

	return results;
}

async function extractContent(
	html: string,
	url: string,
	namespace: string,
	index: number,
	options: Required<ScrapeOptions>,
): Promise<ScrapedContent> {
	// Remove stylesheets and CSS from HTML before parsing to avoid JSDOM errors
	const cleanedHtml = html
		// Remove all <style> tags and their content
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
		// Remove all <link> tags that reference stylesheets
		.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, "")
		// Remove any remaining CSS-related attributes
		.replace(/<[^>]*style\s*=\s*["'][^"']*["'][^>]*>/gi, (match) => {
			return match.replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");
		});

	// Create JSDOM with minimal configuration (no CSS parsing)
	const dom = new JSDOM(cleanedHtml, {
		// Disable all resource loading to avoid CSS parsing
		resources: "usable",
		// Don't run any scripts
		runScripts: "outside-only",
	});
	const document = dom.window.document;

	// Extract title
	const title =
		document.querySelector("title")?.textContent?.trim() ||
		document.querySelector("h1")?.textContent?.trim() ||
		"Untitled";

	const language = document.querySelector("html")?.getAttribute("lang") || "en";

	// Extract meta information
	const description =
		document
			.querySelector('meta[name="description"]')
			?.getAttribute("content") ||
		document
			.querySelector('meta[property="og:description"]')
			?.getAttribute("content") ||
		"";

	const keywords =
		document.querySelector('meta[name="keywords"]')?.getAttribute("content") ||
		"";
	const author =
		document.querySelector('meta[name="author"]')?.getAttribute("content") ||
		"";
	const favicon =
		document.querySelector('link[rel="icon"]')?.getAttribute("href") ||
		document.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
		"";
	const ogImage =
		document
			.querySelector('meta[property="og:image"]')
			?.getAttribute("content") || "";

	// Extract headings
	const headings = Array.from(
		document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
	)
		.map((h) => (h as Element).textContent?.trim())
		.filter(Boolean) as string[];

	// Extract main content and convert to markdown
	const fullContent = await extractMarkdownContent(document, options);

	// Create searchable text with namespace
	const searchableText = ` ${title} ${description} ${fullContent}`.substring(
		0,
		2000,
	);

	return {
		id: `${namespace}-${index}`,
		content: {
			text: searchableText,
			url: url,
			title: title,
			language: language,
		},
		metadata: {
			namespace: namespace,
			title: title,
			url: url,
			sourceURL: url,
			crawlDate: new Date().toISOString(),
			pageTitle: title,
			description: description,
			favicon: favicon,
			ogImage: ogImage,
			fullContent: fullContent.substring(0, 43000),
			headings: headings.length > 0 ? headings : [],
			keywords: keywords || "",
			author: author || "",
		},
	};
}

async function extractMarkdownContent(
	document: Document,
	options: Required<ScrapeOptions>,
): Promise<string> {
	let content = "";

	// Try to find content using the contentTag selector
	if (options.contentTag) {
		const element = document.querySelector(options.contentTag);
		if (element) {
			// Clone the element to avoid modifying the original DOM
			const clonedElement = element.cloneNode(true) as Element;

			// Remove unwanted elements from the cloned element
			const unwantedSelectors = [
				"script",
				"style",
				"nav",
				"header",
				"footer",
				"aside",
				"noscript",
				".advertisement",
				".ads",
				".sidebar",
				".menu",
			];

			// Add custom exclude tags
			if (options.excludeTags && options.excludeTags.length > 0) {
				unwantedSelectors.push(...options.excludeTags);
			}

			const unwantedElements = clonedElement.querySelectorAll(
				unwantedSelectors.join(", "),
			);
			unwantedElements.forEach((el) => {
				el.remove();
			});

			content = await htmlToMarkdown({ html: clonedElement.outerHTML });
		}
	}

	// Fallback to body if no content found
	if (!content) {
		const body = document.querySelector("body");
		if (body) {
			// Clone the body to avoid modifying the original DOM
			const clonedBody = body.cloneNode(true) as Element;

			// Remove unwanted elements
			const unwantedSelectors = [
				"script",
				"style",
				"nav",
				"header",
				"footer",
				"aside",
				"noscript",
				".advertisement",
				".ads",
				".sidebar",
				".menu",
			];

			// Add custom exclude tags
			if (options.excludeTags && options.excludeTags.length > 0) {
				unwantedSelectors.push(...options.excludeTags);
			}

			const unwantedElements = clonedBody.querySelectorAll(
				unwantedSelectors.join(", "),
			);
			unwantedElements.forEach((el) => {
				el.remove();
			});

			content = await htmlToMarkdown({ html: clonedBody.outerHTML });
		}
	}

	// Clean and process content
	content = cleanContent(content, options);

	return content;
}

function cleanContent(
	content: string,
	options: Required<ScrapeOptions>,
): string {
	// Clean up markdown formatting
	const cleanedContent = content
		// Remove excessive whitespace but preserve markdown structure
		.replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
		.replace(/[ \t]+$/gm, "") // Remove trailing spaces from lines
		.replace(/^\s+|\s+$/g, "") // Trim start and end
		// Remove empty lines at the beginning and end
		.replace(/^\n+/, "")
		.replace(/\n+$/, "");

	// Limit content length
	if (cleanedContent.length > options.maxContentLength) {
		return cleanedContent.substring(0, options.maxContentLength) + "...";
	}

	return cleanedContent;
}
