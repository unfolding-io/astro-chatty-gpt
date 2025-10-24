# Astro Chatty GPT - Playground

This is the playground/demo site for **Astro Chatty GPT**, an intelligent search-powered chatbot integration for Astro sites.

## 🤖 What is Astro Chatty GPT?

Astro Chatty GPT is an integration that adds intelligent chatbot capabilities to your Astro site using:

- **OpenAI GPT-5** for AI responses
- **Upstash Search** for content indexing and retrieval
- **Real-time streaming** for smooth user experience
- **Customizable widgets** for seamless integration

## 🚀 Features

- ✅ **Content Indexing**: Automatically indexes your site content
- ✅ **Search-Powered**: Uses Upstash Search for relevant content retrieval
- ✅ **AI Responses**: Powered by OpenAI GPT-5 with reasoning capabilities
- ✅ **Streaming Support**: Real-time response streaming
- ✅ **Custom Widgets**: Build your own or use the provided test widget
- ✅ **Multiple Languages**: Support for different languages
- ✅ **Source Attribution**: Shows sources used in responses

## 📁 Project Structure

This playground demonstrates the Astro Chatty GPT integration:

```text
/
├── public/
│   ├── favicon.svg
│   └── widget.iife.js          # Chat widget script
├── src/
│   ├── components/
│   │   └── Card.astro          # Reusable card component
│   ├── content/
│   │   ├── config.ts           # Content collection config
│   │   └── pages/              # Documentation pages
│   │       ├── get-started.md
│   │       ├── using-our-chat-widget.md
│   │       ├── create-your-own-widget.md
│   │       ├── open-ai-key.md
│   │       └── upstash-api-key.md
│   ├── layouts/
│   │   └── Layout.astro        # Main layout with footer
│   └── pages/
│       ├── index.astro         # Home page with test form
│       └── [slug].astro        # Dynamic content pages
└── astro.config.mts           # Astro config with integration
```

## 📚 Documentation Pages

- **Home** (`/`) - Main landing page with chatbot test form
- **Getting Started** (`/get-started`) - Quick setup guide
- **Using Chat Widget** (`/using-our-chat-widget`) - Test widget documentation
- **Create Your Own Widget** (`/create-your-own-widget`) - Custom widget development
- **OpenAI API Key Setup** (`/open-ai-key`) - API key configuration
- **Upstash Search Setup** (`/upstash-api-key`) - Search backend setup

## 🛠️ Setup & Development

### Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. **Upstash Search**: Create a search database at [Upstash Console](https://console.upstash.com/)
3. **Environment Variables**: Create a `.env` file with your credentials

### Environment Variables

Create a `.env` file in the project root:

```bash
OPENAI_API_KEY="your-openai-api-key"
UPSTASH_SEARCH_REST_URL="your-upstash-url"
UPSTASH_SEARCH_REST_TOKEN="your-upstash-token"
```

### Development Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🧪 Testing the Integration

1. **Start the dev server**: `npm run dev`
2. **Visit the homepage**: Navigate to `http://localhost:4321`
3. **Test the chatbot**: Use the test form on the homepage
4. **Try streaming**: Enable the "Streaming Response" checkbox
5. **Test different languages**: Use the language selector

## 📖 Documentation

- **Getting Started**: `/get-started` - Quick setup guide
- **Using Chat Widget**: `/using-our-chat-widget` - Test widget documentation  
- **Create Your Own**: `/create-your-own-widget` - Custom widget development
- **API Setup**: `/open-ai-key` and `/upstash-api-key` - Service configuration

## 🔗 Learn More

- [Astro Documentation](https://docs.astro.build)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Upstash Search Documentation](https://upstash.com/docs/search)
