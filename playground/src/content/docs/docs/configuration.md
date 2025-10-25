---
title: Configuration
description: This page covers all available configuration options for the Astro ChattyGPT integration. Each option is explained in detail with examples and use cases.
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/started.png'
---

## AstroChattyGpt integration options

This page covers all available configuration options for the Astro ChattyGPT integration. Each option is explained in detail with examples and use cases.

### `upstashUrl`

**Type:** `string`  
**Default:** None (required)  
**Description:** The REST API URL for your Upstash Search database.

This is the primary endpoint where your search index is stored. You can find this URL in your Upstash dashboard under the "REST API" section. The URL typically follows the format: `https://your-database-name.upstash.io`.

**Example:**
```javascript
upstashUrl: "https://my-search-db.upstash.io"
```

### `upstashToken`

**Type:** `string`  
**Default:** None (required)  
**Description:** The authentication token for your Upstash Search database.

This token is required to authenticate API requests to your Upstash database. Keep this secure and never expose it in client-side code. You can find this token in your Upstash dashboard alongside the URL.

**Example:**
```javascript
upstashToken: "AX-ACQgYjQ5Yj..."
```

### `openAiKey`

**Type:** `string`  
**Default:** None (required)  
**Description:** Your OpenAI API key for generating AI responses.

This key is used to authenticate with OpenAI's API when generating responses. Make sure to keep this secure and consider using environment variables for production deployments.

**Example:**
```javascript
openAiKey: "sk-..."
```

### `maxOutputTokens`

**Type:** `number`  
**Default:** `500`  
**Description:** Maximum number of tokens the AI can use when generating responses.

This controls the length of AI responses. Higher values allow for longer, more detailed responses but increase API costs. Lower values result in more concise responses.

**Example:**
```javascript
maxOutputTokens: 1000  // Allows for longer responses
```

### `excludeRoutes`

**Type:** `string[]`  
**Default:** `[]`  
**Description:** Array of route patterns to exclude from search indexing.

Use this to prevent certain pages from being indexed for search. Useful for excluding admin pages, private content, or pages that shouldn't appear in search results.

**Pattern Types:**
- **Exact matches**: `/404` excludes exactly `/404`
- **Prefix matching**: `/admin` excludes `/admin/dashboard/`, `/admin/users/`, etc.
- **Glob patterns**: `/admin/*` excludes `/admin/dashboard/`, `/admin/users/`, but not `/admin`
- **Nested patterns**: `/private/**/*` excludes all content under `/private/` at any depth

**Examples:**
```javascript
excludeRoutes: [
  "/admin/*",           // Exclude all admin pages
  "/private/**/*",       // Exclude all private content (any depth)
  "/404",               // Exclude 404 page
  "/api/*",             // Exclude API documentation
  "/test",              // Exclude /test/index.html and /test.html
  "/draft/*"            // Exclude all draft content
]
```

**What gets excluded:**
- `/admin/dashboard/` ✅ (matches `/admin/*`)
- `/private/docs/secret/` ✅ (matches `/private/**/*`)
- `/404` ✅ (exact match)
- `/api/endpoints/` ✅ (matches `/api/*`)
- `/test` ✅ (exact match - excludes both `/test/index.html` and `/test.html`)
- `/draft/article/` ✅ (matches `/draft/*`)

**What gets included:**
- `/docs/configuration/` ✅ (no match)
- `/blog/post/` ✅ (no match)
- `/about/` ✅ (no match)

### `maxContextDocs`

**Type:** `number`  
**Default:** `10`  
**Description:** Maximum number of context documents to include in AI responses.

This controls how many relevant documents are retrieved and sent to the AI for context. More documents provide better context but may increase response time and costs.

**Example:**
```javascript
maxContextDocs: 15  // Include more context documents
```

### `maxContentLength`

**Type:** `number`  
**Default:** `2000`  
**Description:** Maximum character length of content to index from each page.

This prevents extremely long pages from consuming too much storage space. Content longer than this limit will be truncated during indexing.

**Important:** Upstash has document size limits, so it's recommended to keep this value under 5000 characters to ensure compatibility and avoid indexing issues.

**Example:**
```javascript
maxContentLength: 5000  // Safe limit for Upstash compatibility
```

### `contentTag`

**Type:** `string`  
**Default:** `main`  
**Description:** CSS selector to identify the main content area of your pages.

This helps the system focus on the actual content and ignore navigation, headers, footers, and other non-content elements. Can be a class, ID, or HTML tag.

**Examples:**
```javascript
contentTag: ".main-content"  // CSS class
contentTag: "#article-body"  // CSS ID
contentTag: "article"        // HTML tag
```

### `searchLimit`

**Type:** `number`  
**Default:** `10`  
**Description:** Maximum number of search results to return from Upstash.

This controls how many search results are retrieved from your search index. Higher values may provide more comprehensive results but could increase response time.

**Example:**
```javascript
searchLimit: 20  // Return more search results
```

### `excludeTags`

**Type:** `string[]`  
**Default:** `[]`  
**Description:** CSS selectors for content to exclude from indexing.

Use this to exclude specific elements from being indexed, such as navigation menus, sidebars, or other non-content areas.

**Example:**
```javascript
excludeTags: [
  ".navigation",
  ".sidebar",
  ".footer",
  ".ads"
]
```

### `botName`

**Type:** `string`  
**Default:** `"ChattyGpt"`  
**Description:** The name of your chatbot as it appears to users.

This name will be displayed in the chat interface and used in AI responses to personalize the experience.

**Example:**
```javascript
botName: "My Site Assistant"
```

### `systemPrompt`

**Type:** `string`  
**Default:** Default prompt  
**Description:** Custom system prompt to define the AI's behavior and personality.

This allows you to customize how the AI responds, its tone, personality, and specific instructions for your use case.

**Example:**
```javascript
systemPrompt: "You are a helpful assistant for our documentation site. Always provide accurate, helpful information and cite sources when possible."
```

