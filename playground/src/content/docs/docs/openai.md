---
title: OpenAi Key
description: The GPT-5 API allows developers to access OpenAI's latest language model, which features improved reasoning capabilities and adjustable parameters for response generation.
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/ai.png'
---


## Step 1: Get Your OpenAI API Key

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Log in with your OpenAI account (or create one if you don’t have it yet).
3. In the left sidebar, click **“View API keys”** or navigate directly to  
   [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
4. Click **“Create new secret key”** and give it a name (for example: `astro-app`).
5. Copy the key immediately — it will only be shown once.

Your key will look something like this:

```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Add Your API Key to Your Environment

In your project root, create a `.env` file (if you don’t have one yet):

```bash
touch .env
```

Add your key:

```bash
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

That's all you need to connect your project to the OpenAI API securely.

---

## Step 3: Ensure You Have Sufficient Account Balance

OpenAI charges for API usage based on the number of tokens processed. Make sure your account has sufficient funds:

1. Go to [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Check your current usage and remaining credits
3. Add payment method if you haven't already
4. Set up usage alerts to monitor your spending

**Important:** Without sufficient funds, API calls will fail with billing errors.

---

## AI Cost

This integration uses the **GPT-5 API** for generating responses. The cost of using the AI chatbot is primarily determined by:

- **Number of documents** - Each document you include in the AI context increases token usage
- **Max document length** - Longer documents consume more tokens per document
- **Chat history** - If you include previous messages in your API calls, this adds to the token count

The more documents you retrieve for context, the longer each document is, and the longer your chat history, the more tokens will be consumed per API call.

**Estimated Cost:** Based on testing, expect around **1 cent per message**, but your mileage may vary depending on how many documents you use and whether you include chat history in your API calls.

For detailed pricing information, visit:
- [OpenAI Pricing](https://openai.com/pricing)
- [Token Usage Calculator](https://platform.openai.com/tokenizer)

---

- You can check model access at:
  [https://platform.openai.com/account/limits](https://platform.openai.com/account/limits)
 

---
 