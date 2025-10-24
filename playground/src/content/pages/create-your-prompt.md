---
title: 'Creating the Perfect System Prompt'
author: 'ChattyGpt'
description: 'Learn how to build your own custom chat widget with JavaScript examples and best practices'
icon: '💬'
thumbnail: "/prompt.png"
order: 100
---
# Creating the Perfect System Prompt

The **system prompt** is where you define your chatbot’s personality, behavior, and response style.  
It’s the most important piece of your assistant’s setup — it tells the model **who it is**, **how to respond**, and **what limits to follow**.

---

## 💡 What Is a System Prompt?

A system prompt acts as your AI’s “operating manual.”  
It defines the tone, context, and structure of every reply.

You use it to control:
- The **persona** (e.g., “You are the Real Ireland travel assistant.”)
- The **language style** (formal, casual, friendly, professional)
- The **format** (Markdown, plain text, or HTML)
- The **boundaries** (e.g., use only provided context)

This is where you make the assistant truly fit your brand or website.

---

## 🧩 Example System Prompt

Here’s a sample system prompt template you can adapt:

```
You are {bot_name}, a website assistant for {site_name}.  
- Always reply in professional human-friendly {language}.  
- Always reply as an employee of {site_name}, so it is 'our services', 'on our platform', etc.  
- Always return your entire response as **a single Markdown-formatted string** that can be rendered directly.  
- In Markdown use **bold** for headers and *italic* for the most important concepts.  
- If a user greets you or engages in small talk, respond professionally without referencing the platform.  
- For questions, answer using **ONLY** the provided context below. If the context isn't sufficient to answer, say so explicitly.  
- When you include a URL, make it a **Markdown link** like `[title](https://example.com)`.  
- When showing links, max 3 results and always show:  
  - **Thumbnail** (if available) as a Markdown image `![alt text](image_url)`  
  - **Title** as a clickable Markdown link to the related page  
- Keep responses under 150 words.  
```

This example gives your chatbot clear rules about how to talk, what to include, and what format to use.

---

## 🧠 Tips for Writing a Great System Prompt

1. **Be explicit** — Tell the bot exactly what to do and what *not* to do.  
2. **Use examples** — Show how a good answer should look.  
3. **Keep it short but structured** — Too much detail can confuse the model.  
4. **Match your tone to your brand** — A legal firm’s assistant sounds different from a travel agency’s.  
5. **Define fallback behavior** — e.g., “If unsure, say you don’t have enough information.”  

---

## 🧾 Choosing a Format

You can instruct the bot to respond in **Markdown**, **plain text**, or **HTML**, depending on where and how you’ll display the output.

### 🟢 Markdown (recommended)
Perfect for web apps or chat widgets. Easy to style and render safely.

```
- Use **bold** for emphasis  
- Use *italic* for subtle highlights  
- Use `[links](https://example.com)` for navigation  
```

### 🔵 Plain Text
Best for console apps or environments without formatting support.  
Tell the bot: “Respond in plain text with no formatting or special characters.”

### 🟣 HTML
Useful if you need rich formatting (like embedded images or links).  
Tell the bot: “Respond in valid HTML only. Do not include `<html>` or `<body>` tags.”

Example:
```
<p><strong>Welcome!</strong> Visit <a href="https://example.com">our site</a> for more info.</p>
```

---

## 🧰 Pro Tip

When building your assistant, start with a simple version of your system prompt and test it interactively.  
Gradually refine tone, limits, and formatting rules as you see how the model behaves.

You’ll be surprised how much a few words in the system prompt can change your bot’s entire personality.
