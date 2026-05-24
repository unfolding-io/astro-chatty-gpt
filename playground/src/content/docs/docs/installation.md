---
title: Install
description: Install astro-chatty-gpt on Astro 6 with Upstash Search and OpenAI setup
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/ai.png'
---

## Requirements

Before installing, ensure your project meets these requirements:

- **Astro 6** — this integration declares `astro` `^6.0.0` as a peer dependency
- **Node.js 22.12+** — required by Astro 6
- **Server output** — set `output: 'server'` or `output: 'hybrid'` so middleware and API routes work
- **Site URL** — set `site` in `astro.config` (used for indexing and canonical URLs)
- **Upstash Search** — [create a database](https://upstash.com/docs/search/overall/getstarted) and copy REST credentials
- **OpenAI API key** — from [platform.openai.com](https://platform.openai.com)

## Required environment variables

Create a `.env` file in your project root:

```env
UPSTASH_SEARCH_REST_URL=your_upstash_rest_url
UPSTASH_SEARCH_REST_TOKEN=your_upstash_rest_token
OPENAI_API_KEY=your_openai_api_key
```

See [Upstash keys](/docs/upstash/) and [OpenAI key](/docs/openai/) for step-by-step setup.

## Installation

Install with the Astro CLI:

```bash
pnpm astro add astro-chatty-gpt
```

```bash
npx astro add astro-chatty-gpt
```

```bash
yarn astro add astro-chatty-gpt
```

Or install manually:

```bash
pnpm add astro-chatty-gpt
```

```bash
npm install astro-chatty-gpt
```

```bash
yarn add astro-chatty-gpt
```

## Add the integration

Add the integration to your Astro config. Load secrets from `.env` with Vite's `loadEnv`:

```js
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify"; // or your server adapter
import AstroChattyGpt from "astro-chatty-gpt";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

export default defineConfig({
  site: "https://yoursite.com",
  output: "server",
  adapter: netlify(), // optional: any SSR adapter
  integrations: [
    AstroChattyGpt({
      upstashUrl: env.UPSTASH_SEARCH_REST_URL,
      upstashToken: env.UPSTASH_SEARCH_REST_TOKEN,
      openAiKey: env.OPENAI_API_KEY,
      model: "gpt-5.4-mini",
      reasoningEffort: "none",
      textVerbosity: "low",
      maxOutputTokens: 500,
      excludeRoutes: ["admin/", "private/"],
      maxContextDocs: 10,
      maxContentLength: 2000,
      contentTag: "main",
      searchLimit: 10,
      excludeTags: [".sidebar", ".ads", ".navigation"],
      botName: "AstroChattyGpt",
      systemPrompt: "You are a helpful assistant for my website.",
    }),
  ],
});
```

## Build and index

Run a production build to index your site into Upstash:

```bash
pnpm astro build
```

On `astro:build:done`, the integration reads generated HTML files, extracts main content, and upserts documents to your Upstash Search index. Missing credentials log a warning and skip indexing — the build still succeeds.

## Verify

1. **Search** — `GET /api/search?q=your+query` (after deploy or `astro dev`)
2. **Chat** — `POST /api/chatbot` with `{ "query": "...", "stream": false }`

Use [API endpoint](/docs/api-endpoint/) for full request examples.

## Next steps

- [Configuration](/docs/configuration/) — all integration options
- [System prompt](/docs/prompts/) — customize bot personality
- [Chat widget](/docs/widget/) — optional demo UI
