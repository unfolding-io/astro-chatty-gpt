---
title: 'Create your own widget'
author: 'ChattyGpt'
description: 'A basic introduction to communicate with the api'
icon: '⚡'
thumbnail: "/widget.png"
order: 50
---
# Creating Your Own Chat Widget

This page provides a **basic introduction** to communicate with the api.  
It includes placeholder code and example patterns — not production-ready code.  
👉 **Do your own research and testing before using it in a live environment.**

---

## 💡 Why Build Your Own?

Building a custom chat widget gives you **full control** over:

- 🎨 **Styling** — match your own brand and design system  
- ⚙️ **Behavior** — decide how messages appear, when typing indicators show, etc.  
- 🧩 **Integration** — connect seamlessly with your existing frontend, backend, or CMS  

You’re not limited by any prebuilt UI or vendor lock-in. A custom widget can fit perfectly into your Astro, React, Vue, or vanilla JS project.

 
---

## 🚀 Core Concepts

### 1. API Integration
Your widget needs to communicate with the `/api/chatbot` endpoint that handles:
- User queries
- Search functionality  
- AI response generation
- Streaming vs non-streaming responses

### 2. Streaming vs Non-Streaming
- **Non-streaming**: Simple request/response pattern
- **Streaming**: Real-time text updates as the AI generates responses

### 3. Response Format
The API returns structured data with:
- `answer`: The AI response text
- `sources`: Array of source documents used
- `sources[].url`: Link to the source
- `sources[].title`: Title of the source
- `sources[].snippet`: Relevant text snippet

---

## 📝 Basic Implementation

### Simple Form-Based Widget

Here's a basic implementation for a form-based chat widget:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chatbot-form');
    const submitBtn = document.getElementById('submit-btn');
    const responseArea = document.getElementById('response');
    const responseContent = document.getElementById('response-content');
    const sourcesArea = document.getElementById('sources');
    const sourcesContent = document.getElementById('sources-content');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const query = formData.get('query');
        const stream = formData.get('stream') === 'on';
        const language = formData.get('language');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        responseArea.style.display = 'block';
        responseContent.textContent = 'Loading...';
        sourcesArea.style.display = 'none';
        
        try {
            const requestBody = {
                query: query,
                stream: stream,
                language: language
            };
            
            if (stream) {
                // Handle streaming response
                await handleStreamingResponse(requestBody);
            } else {
                // Handle non-streaming response
                await handleNonStreamingResponse(requestBody);
            }
        } catch (error) {
            console.error('Error:', error);
            responseContent.textContent = `Error: ${error.message}`;
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Question';
        }
    });
    
    async function handleNonStreamingResponse(requestBody) {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display response
        responseContent.textContent = data.answer || 'No response received';
        
        // Display sources if available
        if (data.sources && data.sources.length > 0) {
            displaySources(data.sources);
        }
    }
    
    function displaySources(sources) {
        sourcesArea.style.display = 'block';
        sourcesContent.innerHTML = '';
        
        sources.forEach(source => {
            const sourceDiv = document.createElement('div');
            sourceDiv.className = 'source-item';
            
            const link = document.createElement('a');
            link.href = source.url;
            link.target = '_blank';
            link.textContent = source.title || source.url;
            
            const snippet = document.createElement('div');
            snippet.className = 'source-snippet';
            snippet.textContent = source.snippet || '';
            
            sourceDiv.appendChild(link);
            if (source.snippet) {
                sourceDiv.appendChild(snippet);
            }
            
            sourcesContent.appendChild(sourceDiv);
        });
    }
});
```

---

## 🌊 Streaming Implementation

### Advanced Streaming with Buffering

For real-time streaming responses, you need to handle the streaming protocol:

```javascript
async function handleStreamingResponse(requestBody) {
    const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let sources = null;
    let fullText = '';
    let buffer = '';
    
    if (reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Add new data to buffer
            buffer += decoder.decode(value, { stream: true });
            
            // Process complete lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer
            
            for (const line of lines) {
                if (line.startsWith('DATA:')) {
                    try {
                        const data = JSON.parse(line.slice(5));
                        
                        if (data.type === 'sources') {
                            sources = data.data;
                            displaySources(sources);
                        } else if (data.type === 'text') {
                            fullText += data.data;
                            responseContent.textContent = fullText;
                        } else if (data.type === 'end') {
                            // Stream completed
                            console.log('Stream completed');
                        } else if (data.type === 'error') {
                            console.error('Stream error:', data.data);
                            responseContent.textContent = `Error: ${data.data}`;
                        }
                    } catch (e) {
                        console.error('Error parsing stream data:', e, 'Line:', line);
                    }
                }
            }
        }
        
        // Process any remaining data in buffer
        if (buffer.trim()) {
            const lines = buffer.split('\n');
            for (const line of lines) {
                if (line.startsWith('DATA:')) {
                    try {
                        const data = JSON.parse(line.slice(5));
                        
                        if (data.type === 'sources') {
                            sources = data.data;
                            displaySources(sources);
                        } else if (data.type === 'text') {
                            fullText += data.data;
                            responseContent.textContent = fullText;
                        }
                    } catch (e) {
                        console.error('Error parsing final buffer data:', e);
                    }
                }
            }
        }
    }
}
```
 
 

---

## 🔗 Related Documentation

- [Using the Test Widget](/using-our-chat-widget) - Test the provided widget
- [Setting Up Upstash Search](/upstash-api-key) - Configure your search backend
- [Getting OpenAI API Key](/open-ai-key) - Set up your AI provider

---

## ✅ Summary

Building your own chat widget gives you complete control over the user experience. Start with the basic implementation, add streaming support, and gradually enhance with advanced features. Remember to focus on performance, accessibility, and user experience throughout the development process.