import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { loadEnv } from "vite";

import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import packageName from "../packages/astro-chatty-gpt/dist/index.js";

const env = loadEnv("", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	site: "http://astrochattygpt.unfolding.io",
	adapter: netlify({
		imageCDN: false,
	}),
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
		starlight({
			plugins: [starlightThemeRapide()],
			title: 'AstroChattyGpt Docs',
			 
			sidebar: [
				// A single link item labelled “Home”.
				/* { label: 'Home', link: '/' }, */
				// A group labelled “Start Here” containing four links.
				{
				  label: 'Get Startet',
				  items: [ 
					// Or using the shorthand for internal links.
					'docs/installation',
					'docs/configuration',
					'docs/api-endpoint',
					'docs/development'
				  ],
				},
				{
					label: 'Tips',
					items: [ 
					  // Or using the shorthand for internal links.
					  'docs/prompts',
					  'docs/widget',
					  'docs/upstash',
					  'docs/openai'
					],
				  },
				// A group linking to all pages in the reference directory.
				/* {
				  label: 'Reference',
				  autogenerate: { directory: 'reference' },
				}, */
			  ],
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
