---
title: Development
description: Contribute to astro-chatty-gpt — monorepo setup, Astro 6 playground, and troubleshooting
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/db.png'
---

## Monorepo structure

This repository is a pnpm workspace:

| Path | Purpose |
|------|---------|
| `packages/astro-chatty-gpt` | The published integration (tsup → `dist/`) |
| `playground` | Starlight docs site + integration demo |
| Root | Shared scripts, Biome, Changesets |

## Requirements

- **Node.js 22.12+** (see `.nvmrc`)
- **pnpm 10+** (`corepack enable` recommended)

## Setup

```bash
pnpm install
```

Build the integration package (required before the playground can load it):

```bash
pnpm package:build
```

## Development commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Watch package + run playground dev server in parallel |
| `pnpm package:dev` | Watch `packages/astro-chatty-gpt` with tsup |
| `pnpm playground:dev` | Astro dev server (Starlight docs) |
| `pnpm package:build` | One-off package build |
| `pnpm playground:build` | `astro check` + production build + Upstash indexing |
| `pnpm playground:check` | Type-check playground only |
| `pnpm lint` | Biome check across the repo |

The playground uses **Astro 6**, **Starlight 0.39+**, **Tailwind 4.3**, and **@astrojs/netlify 7** with HMR for the integration via `astro-integration-kit`.

## Environment variables

Copy credentials into `playground/.env`:

```env
UPSTASH_SEARCH_REST_URL=...
UPSTASH_SEARCH_REST_TOKEN=...
OPENAI_API_KEY=...
```

## Local API testing

Use the dev server — `astro preview` is **not supported** with `@astrojs/netlify` v7:

```bash
pnpm playground:dev
```

Then test:

- `GET http://localhost:4321/api/search?q=installation`
- `POST http://localhost:4321/api/chatbot` with JSON body

## Troubleshooting

### "Search service unavailable"

- Check Upstash REST URL and token in `.env`
- Confirm the Search database is active in the Upstash console

### "AI service unavailable"

- Verify `OPENAI_API_KEY` is set and valid
- Confirm your account has credits and access to the configured `model`
- Check [platform.openai.com/account/limits](https://platform.openai.com/account/limits)

### No search results

- Run `pnpm playground:build` (or `astro build`) so content is indexed
- Review `excludeRoutes` and `excludeTags` in `astro.config`
- Ensure `contentTag` matches your HTML (default: `main`)

### Build-time indexing skipped

- Set `site` in `astro.config`
- Provide all three env vars (`UPSTASH_*` + `OPENAI_API_KEY` for chat; indexing only needs Upstash)
- Check build logs for `[astro-chatty-gpt]` messages

### Package changes not reflected

Restart the playground dev server after editing `packages/astro-chatty-gpt` source, or rely on `pnpm dev` which watches both.
