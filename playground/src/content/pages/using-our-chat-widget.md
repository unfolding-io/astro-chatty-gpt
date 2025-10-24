---
title: 'Using our chat widget'
author: 'ChattyGpt'
description: 'Learn how to integrate and customize the Astro Chatty GPT chat widget for testing and development'
icon: '🤖'
thumbnail: "/widget.png"
order: 90
---

# Using the Astro Chatty GPT Chat Widget

This guide explains how to integrate and customize the **Astro Chatty GPT chat widget** for testing and development purposes.

> **💡 Best Practice**: While this widget is great for testing, we recommend building your own custom chat widget using your preferred framework for production use. This gives you full control over styling, behavior, and integration with your existing design system.

---

## 🚀 Quick Start

### Step 1: Add the Widget HTML

Add the widget container and script to your HTML:

```html
<div id="chat-widget"></div>
<script src="/widget.iife.js" defer></script>
```

### Step 2: Initialize the Widget

Add the initialization script:

```html
<script>
  // Initialize the chat widget when the page loads
  document.addEventListener("DOMContentLoaded", function () {
    // Wait a bit for the module to load
    setTimeout(() => {
      if (window.AstroChattyGptWidget) {
        window.AstroChattyGptWidget.init(
          { 
            title: "ChatTIE",
            language: "en", 
            theme: {
              primary: "#eb720f",
              primaryHover: "#000000",
            },
          },
          "chat-widget"
        );
      }
    }, 1000);
  });
</script>
```

---

## ⚙️ Configuration Options

### Basic Configuration

```javascript
window.AstroChattyGptWidget.init({
  // Widget title
  title: "ChatTIE",
  
  // Language for the interface
  language: "en",
  
  // Theme customization
  theme: {
    primary: "#eb720f",        // Primary color
    primaryHover: "#000000",   // Hover state color
  }
}, "chat-widget"); // Container element ID
```

### Advanced Configuration

```javascript
window.AstroChattyGptWidget.init({
  title: "My Custom Chat",
  language: "en",
  theme: {
    primary: "#your-brand-color",
    primaryHover: "#darker-shade"
  }
}, "chat-widget");
```

---

## 🎨 Customization

### Theme Colors

Customize the widget appearance by modifying the theme object:

```javascript
theme: {
  primary: "#your-primary-color",      // Main brand color
  primaryHover: "#hover-color"         // Hover state color
}
```

---

## 🔧 Integration Examples

### Astro Component

Create a reusable Astro component:

```astro
---
// components/ChatWidget.astro
---

<div id="chat-widget"></div>
<script src="/widget.iife.js" defer></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      if (window.AstroChattyGptWidget) {
        window.AstroChattyGptWidget.init({
          title: "Help Center",
          language: "en",
          theme: {
            primary: "#your-brand-color",
            primaryHover: "#darker-shade",
          },
        }, "chat-widget");
      }
    }, 1000);
  });
</script>
```

### Download the Widget Script

You can download the widget script from your Astro project:

```bash
# The widget script is located at:
/public/widget.iife.js
```

Or access it directly in your browser:
<a href="/widget.iife.js" target="_blank">Download widget.iife.js</a>

---

## 🛠️ Development Tips

### Testing the Widget

1. **Local Development**: The widget works with your local Astro dev server
2. **API Endpoint**: Make sure your `/api/chatbot` endpoint is working
3. **Environment Variables**: Ensure your OpenAI and Upstash credentials are set

### Debugging

Check the browser console for any error messages if the widget doesn't load properly.

### Performance Considerations

- **Lazy Loading**: The widget loads asynchronously to avoid blocking page render
- **Shadow DOM**: Uses Shadow DOM for style isolation

---

## 🚀 Production Recommendations

### Build Your Own Widget

For production, consider building a custom widget:

1. **Framework Integration**: Use your preferred framework
2. **Design System**: Match your existing design system
3. **Custom Features**: Add features specific to your use case
4. **Performance**: Optimize for your specific requirements
 

---

## 📚 Next Steps

1. **Test the Widget**: Try the widget on your pages
2. **Customize Styling**: Adjust colors and positioning
3. **Build Custom**: Consider building your own for production
4. **API Integration**: Ensure your chatbot API is working properly

---

## 🔗 Related Documentation

- [Setting Up Upstash Search](/upstash-api-key) - Configure your search backend
- [Getting OpenAI API Key](/open-ai-key) - Set up your AI provider
- [Astro Chatty GPT Integration](../) - Main integration documentation

---

## ✅ Summary

The Astro Chatty GPT widget provides a quick way to test your chatbot integration. While perfect for development and testing, consider building a custom widget for production use to have full control over the user experience and integration with your existing design system.