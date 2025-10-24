---
title: 'Setting Up Upstash Search for Your Astro Project'
author: 'ChattyGpt'
description: "Upstash Search is a simple, lightweight, and scalable way to add AI-powered search to your app."
icon: '🔍'
thumbnail: "/db.png"
order: 70
---

# Setting Up Upstash Search for Your Astro Project

This guide walks you through creating an **Upstash Search** database and retrieving your API credentials:  
`UPSTASH_SEARCH_REST_URL` and `UPSTASH_SEARCH_REST_TOKEN`.

---

## 🧠 What Is Upstash Search?

[Upstash Search](https://upstash.com/search) is a fully managed, serverless search database built on Redis.  
It’s perfect for fast, cost-efficient full-text search in static or serverless environments like Astro Actions.

---

## 🚀 Step 1: Create an Upstash Account

1. Go to [https://upstash.com](https://upstash.com)
2. Sign up using GitHub, Google, or email.
3. Once logged in, click **“Create Database”** → **“Search”**.

---

## 🗂️ Step 2: Create a Search Database

1. Choose **Search** as the database type.
2. Give your database a name (e.g., `echtierland-search`).
3. Pick a **region** close to your users (e.g., `eu-west-1` for Europe).
4. Click **“Create Database”**.

Upstash will automatically provision your search database within a few seconds.

---

## 🔑 Step 3: Get Your Credentials

After the database is created:

1. Open the database dashboard.
2. Find the **“REST API”** section.
3. Copy the following values:
   - **REST URL** → `UPSTASH_SEARCH_REST_URL`
   - **REST Token** → `UPSTASH_SEARCH_REST_TOKEN`

Example:

```bash
UPSTASH_SEARCH_REST_URL=https://your-search-name-eu1.upstash.io
UPSTASH_SEARCH_REST_TOKEN=AYJvNjY6MjM3MzYtYWI2My00ZTNhLTlkNmEtODJmNTA1NzJmZGE4YjNkZTRlNGRmYzA=
```

---

## ⚙️ Step 4: Add to Your Environment Variables

In your Astro project root, create a `.env` file (if you don't already have one):

```bash
touch .env
```

Add your credentials:

```bash
UPSTASH_SEARCH_REST_URL="https://your-search-name.upstash.io"
UPSTASH_SEARCH_REST_TOKEN="your-secret-token"
```

---


## ✅ Done!

You're ready to use Upstash Search in your Astro project.  
Next step: define your search schema and start indexing data.

👉 **Check the official docs for advanced usage:**  
[https://upstash.com/docs/search](https://upstash.com/docs/search)