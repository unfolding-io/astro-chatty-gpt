---
title: Api Endpoint
description: Complete API reference for the /api/chatbot endpoint with request/response examples and configuration options
head:
  - tag: meta
    attrs:
      property: 'og:image'
      content: '/ai.png'
---


## Endpoint

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

### Request Format

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

### Response Format

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

## Frontend Integration

### React/Preact Example

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

### Streaming Example

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
---
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
