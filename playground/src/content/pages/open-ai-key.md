---
title: 'Getting Your OPENAI_API_KEY'
author: 'ChattyGpt'
description: "The GPT-5 API allows developers to access OpenAI's latest language model, which features improved reasoning capabilities and adjustable parameters for response generation."
icon: '🔑'
thumbnail: "/ai.png"
order: 60
---
# Getting Your OPENAI_API_KEY

This guide explains how to obtain your **OpenAI API key**.
 
---

## 🔑 Step 1: Get Your OpenAI API Key

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

## ⚙️ Step 2: Add Your API Key to Your Environment

In your project root, create a `.env` file (if you don’t have one yet):

```bash
touch .env
```

Add your key:

```bash
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

That’s all you need to connect your project to the OpenAI API securely.

---

- You can check model access at:
  [https://platform.openai.com/account/limits](https://platform.openai.com/account/limits)
 

---

## ✅ Summary

- Get your API key from:  
  [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

- Store it in your `.env` file:
  ```bash
  OPENAI_API_KEY="your-secret-key"
  ```

