# ChatGPT-5.1 MCP Server

Model Context Protocol (MCP) server providing GitHub Copilot access to OpenAI's GPT-5.1 model.

## Features

- **chatgpt_query**: Send queries to GPT-5.1 for complex reasoning, code generation, etc.
- **chatgpt_translate**: Professional translation to any language
- **chatgpt_conversation**: Multi-turn conversations with context

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Configuration for GitHub Copilot

Add to your VS Code settings (`settings.json`):

```json
{
  "github.copilot.advanced": {
    "mcp": {
      "servers": {
        "chatgpt-5.1": {
          "command": "node",
          "args": [
            "/mnt/c/GitHub/meni_client/mcp-server/dist/chatgpt-server.js"
          ],
          "env": {
            "VITE_OPENAI_API_KEY": "your-api-key-here"
          }
        }
      }
    }
  }
}
```

Or use the `.env.local` file from the parent directory (automatic).

## Usage Examples

### In GitHub Copilot Chat:

**Simple query:**

```
@chatgpt-5.1 Explain quantum computing in simple terms
```

**Translation:**

```
@chatgpt-5.1 translate "Hello, how are you?" to Russian
```

**Code generation:**

```
@chatgpt-5.1 Write a TypeScript function to validate email addresses with RFC 5322 compliance
```

## Tools Available

### 1. chatgpt_query

Send any prompt to GPT-5.1:

```json
{
  "prompt": "Explain the GDPR in simple terms",
  "system": "You are a legal expert",
  "temperature": 0.7,
  "max_tokens": 4000
}
```

### 2. chatgpt_translate

Professional translation:

```json
{
  "text": "Privacy Policy",
  "target_language": "Russian",
  "source_language": "English",
  "context": "Legal document, maintain formal tone"
}
```

### 3. chatgpt_conversation

Multi-turn conversation:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful coding assistant" },
    { "role": "user", "content": "How do I center a div?" },
    { "role": "assistant", "content": "You can use flexbox..." },
    { "role": "user", "content": "Show me an example" }
  ],
  "temperature": 0.7
}
```

## API Key

The server uses `VITE_OPENAI_API_KEY` from the parent `.env.local` file automatically.

## License

MIT
