---
title: Install
description: Step-by-step installation guide for Astro ChattyGPT integration with OpenAI and Upstash setup
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/ai.png'
---

## Prerequisites

Before using this integration, you'll need:

1. **Upstash Account**: Sign up at [upstash.com](https://upstash.com) and create a Search Database
2. **OpenAI API Key**: Get your API key from [platform.openai.com](https://platform.openai.com)

## Required Environment Variables

Create a `.env` file in your project root:

```env
UPSTASH_SEARCH_REST_URL=your_upstash_rest_url
UPSTASH_SEARCH_REST_TOKEN=your_upstash_rest_token
OPENAI_API_KEY=your_openai_api_key
```

## Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-chatty-gpt
```

```bash
npx astro add astro-chatty-gpt
```

```bash
yarn astro add astro-chatty-gpt
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-chatty-gpt
```

```bash
npm install astro-chatty-gpt
```

```bash
yarn add astro-chatty-gpt
```

2. Add the integration to your astro config

```diff
+import AstroChattyGpt from "astro-chatty-gpt";
+import { loadEnv } from "vite";
+const env = loadEnv("", process.cwd(), "");

export default defineConfig({
  integrations: [
+    AstroChattyGpt({
+      upstashUrl: env.UPSTASH_SEARCH_REST_URL!,
+      upstashToken: env.UPSTASH_SEARCH_REST_TOKEN!,
+      openAiKey: env.OPENAI_API_KEY!,
+      maxOutputTokens: 500,
+      excludeRoutes: ['admin/', 'private/'],
+      maxContextDocs: 10,
+      maxContentLength: 2000,
+      contentTag: 'main',
+      searchLimit: 10,
+      excludeTags: ['.sidebar', '.ads', '.navigation'],
+      botName: 'AstroChattyGpt',
+      systemPrompt: 'You are a helpful assistant for my website.',
+    }),
  ],
});
```
