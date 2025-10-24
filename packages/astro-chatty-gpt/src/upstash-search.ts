import { Search } from "@upstash/search";

// Lazy initialization of Upstash client
let searchClient: Search | null = null;
let searchIndex: ReturnType<Search["index"]> | null = null;

// Initialize Upstash Search client only when needed
function getSearchIndex(
	UPSTASH_SEARCH_REST_URL: string,
	UPSTASH_SEARCH_REST_TOKEN: string,
) {
	if (!searchClient) {
		const url = UPSTASH_SEARCH_REST_URL || process.env.UPSTASH_SEARCH_REST_URL;
		const token =
			UPSTASH_SEARCH_REST_TOKEN || process.env.UPSTASH_SEARCH_REST_TOKEN;

		if (!url || !token) {
			throw new Error(
				"UPSTASH_SEARCH_REST_URL and UPSTASH_SEARCH_REST_TOKEN environment variables are required!!!",
			);
		}

		searchClient = new Search({ url, token });
		searchIndex = searchClient.index("astro-chatty-gpt");
	}

	return searchIndex;
}

// Export a function to get the search index
export { getSearchIndex };

export interface AstroChattyContent {
	text: string;
	url: string;
	title: string;
	language: string;
	[key: string]: unknown;
}

export interface AstroChattyIndex {
	namespace: string;
	url: string;
	pagesCrawled: number;
	crawlDate: string;
	metadata: {
		title: string;
		description?: string;
		favicon?: string;
		ogImage?: string;
	};
}
