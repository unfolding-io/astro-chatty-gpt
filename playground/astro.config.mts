import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";

import packageName from "../packages/astro-chatty-gpt/dist/index.js";
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "");
 

// https://astro.build/config
export default defineConfig({
	site: "http://localhost:4321",
	integrations: [
		packageName({
			upstashUrl: env.UPSTASH_SEARCH_REST_URL,
			upstashToken: env.UPSTASH_SEARCH_REST_TOKEN,
			openAiKey: env.OPENAI_API_KEY,
			maxOutputTokens: 400,
			maxContentLength: 1000,
			contentTag: "main",
			excludeRoutes: ["/about"],
			excludeTags: [".sidebar", ".ads", ".navigation"],
			//systemPrompt: "You are a helpful assistant that can answer questions about the website.",
		}),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve(
				"../packages/astro-chatty-gpt/dist",
			),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
