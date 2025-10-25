---
title: Development
description: Development setup guide for contributing to Astro ChattyGPT with monorepo structure and troubleshooting tips
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/db.png'
---


## Info

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `packages/astro-chatty-gpt` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `packages/astro-chatty-gpt`. Please note that making changes to those files may require restarting the playground dev server.

## Troubleshooting

### Common Issues

1. **"Search service unavailable" error**
   - Check your Upstash credentials are correct
   - Ensure your Upstash Search Database is active
   - Verify the REST URL and token are properly set

2. **"AI service unavailable" error**
   - Verify your OpenAI API key is valid
   - Check you have sufficient OpenAI credits
   - Ensure the API key has the correct permissions

3. **No search results found**
   - Make sure your website has been built and indexed
   - Check the `include` and `exclude` patterns in your configuration
   - Verify your content selectors are targeting the right elements

4. **Build-time indexing fails**
   - Ensure your `site` option is set in `astro.config.mjs`
   - Check that your website URLs are accessible
   - Verify your content selectors match your HTML structure