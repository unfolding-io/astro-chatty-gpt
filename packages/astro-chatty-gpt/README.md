# `astro-chatty-gpt`

An [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that adds AI-powered search and chat functionality to your Astro website using Upstash Search and OpenAI.

## Features

- 🤖 **AI-Powered Search**: Intelligent search across your website content (GPT-5)
- 💬 **Chat Interface**: Interactive chat with your website content
- 🔍 **Search**: Powered by Upstash Search for semantic search
- 🌐 **Multi-language Support**: Search and chat in multiple languages
- 📱 **Streaming Responses**: Real-time streaming chat responses
- ⚡ **Auto-indexing**: Automatically crawls and indexes your website content on every build
- 🎯 **Flexible Configuration**: Customizable search behavior and content filtering

## Usage

### Prerequisites

Before using this integration, you'll need:

1. **Upstash Account**: Sign up at [upstash.com](https://upstash.com) and create a Search Database
2. **OpenAI API Key**: Get your API key from [platform.openai.com](https://platform.openai.com)

### Installation

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

### Configuration

#### Required Environment Variables

Create a `.env` file in your project root:

```env
UPSTASH_SEARCH_REST_URL=your_upstash_rest_url
UPSTASH_SEARCH_REST_TOKEN=your_upstash_rest_token
OPENAI_API_KEY=your_openai_api_key
```

#### Integration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `upstashUrl` | `string` | - | Upstash Search REST URL |
| `upstashToken` | `string` | - | Upstash Search REST Token |
| `openAiKey` | `string` | - | OpenAI API Key |
| `maxOutputTokens` | `number` | `500` | Maximum tokens to use for AI responses |
| `excludeRoutes` | `string[]` | `[]` | Routes to exclude from indexing |
| `maxContextDocs` | `number` | `10` | Maximum number of context documents |
| `maxContentLength` | `number` | `2000` | Maximum content length to index |
| `contentTag` | `string` | - | CSS selector for main content (class, id, or tag) |
| `searchLimit` | `number` | `10` | Maximum number of search results |
| `excludeTags` | `string[]` | `[]` | CSS selectors for content to exclude (id, class, or tag) |
| `botName` | `string` | `"ChattyGpt"` | Name of the chatbot |
| `systemPrompt` | `string` | Default prompt | Custom system prompt for AI responses |

### API Endpoint

The integration automatically creates a `/api/chatbot` endpoint that accepts POST requests:

```javascript
// Basic usage
const response = await fetch('/api/chatbot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'What is this website about?',
    language: 'en',
    stream: false
  })
});

const data = await response.json();
console.log(data.answer); // AI response
console.log(data.sources); // Source documents
```

#### Request Format

```typescript
interface ChatRequest {
  query: string;           // User's question
  language?: string;       // Language code (default: 'en')
  stream?: boolean;       // Enable streaming (default: false)
  messages?: Array<{      // For chat history
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

#### Response Format

```typescript
interface ChatResponse {
  answer: string;         // AI-generated answer
  sources: Array<{       // Source documents
    url: string;
    title: string;
    thumbnail: string;
    snippet: string;
  }>;
}
```

### Frontend Integration

#### React/Preact Example

```jsx
import { useState } from 'react';

export default function ChatBot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, stream: false })
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about this website..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Ask'}
        </button>
      </form>
      
      {response && (
        <div>
          <h3>Answer:</h3>
          <p>{response.answer}</p>
          
          <h4>Sources:</h4>
          <ul>
            {response.sources.map((source, i) => (
              <li key={i}>
                <a href={source.url}>{source.title}</a>
                <p>{source.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

#### Streaming Example

```javascript
async function streamChat(query) {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, stream: true })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('DATA:')) {
        try {
          const data = JSON.parse(line.slice(5));
          
          if (data.type === 'text') {
            // Text content
            console.log(data.data);
          } else if (data.type === 'sources') {
            // Sources
            console.log('Sources:', data.data);
          }
        } catch (e) {
          console.error('Error parsing stream data:', e);
        }
      }
    }
  }
}
```

## Development

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

## License

[MIT Licensed](https://github.com/AstroThemes/astro-chatty-gpt/blob/main/LICENSE). Made with ❤️ by [unfolding](https://unfolding.io).

## Acknowledgements

- Created using [astro-integration-template](https://github.com/florian-lefebvre/astro-integration-template)
- Powered by [Upstash Search](https://upstash.com/docs/search)
- AI capabilities provided by [OpenAI](https://openai.com)
- Built with [Astro](https://astro.build)
- Inspyred by [Firestarter](https://www.firecrawl.dev/blog/firestarter-rag-chatbot-generator)