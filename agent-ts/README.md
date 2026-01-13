# A2UI Restaurant Finder Agent (TypeScript)

Sample TypeScript-based Restaurant finder agent that uses A2UI (Agent to UI) for rich user interfaces and is hosted as an A2A (Agent to Agent) server.

## Features

- **TypeScript/V8 Compatible**: Runs directly in Node.js V8 environment
- **A2A Protocol**: Implements the Agent-to-Agent protocol for inter-agent communication
- **A2UI Support**: Rich UI responses using the Agent-to-UI specification
- **Multiple LLM Providers**: Works with OpenRouter, OpenAI, Azure OpenAI, Gemini, or any OpenAI-compatible endpoint
- **Tool Calling**: Built-in restaurant search tool with function calling support
- **Streaming**: Server-Sent Events (SSE) support for real-time responses

## Prerequisites

- Node.js >= 20.0.0
- npm or pnpm
- An API key from one of the supported LLM providers (see [OpenRouter Guide](./OPENROUTER.md) for easy setup)

## Installation

```bash
cd agent-ts
npm install
```

## Configuration

Create a `.env` file in the `agent-ts` directory. The agent supports multiple LLM providers:

### Option 1: OpenRouter (Recommended)

[OpenRouter](https://openrouter.ai/) provides access to multiple AI models through a single API. It's the easiest way to get started with various models including Claude, GPT-4, Gemini, and more.

```env
# Get your API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# Optional: Add your app info for OpenRouter rankings
OPENROUTER_APP_NAME=A2UI Restaurant Agent
OPENROUTER_REFERER=https://github.com/yourusername/your-repo

# Server Configuration
HOST=localhost
PORT=10002
LOG_LEVEL=info
```

**Popular OpenRouter Models:**
- `anthropic/claude-3.5-sonnet` - Excellent reasoning and coding
- `openai/gpt-4o` - Latest GPT-4 model
- `google/gemini-2.0-flash-exp` - Fast and capable
- `meta-llama/llama-3.3-70b-instruct` - Open source alternative

See all available models at: https://openrouter.ai/models

### Option 2: OpenAI

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Server Configuration
HOST=localhost
PORT=10002
LOG_LEVEL=info
```

### Option 3: Azure OpenAI

```env
OPENAI_API_KEY=your-azure-key
OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/deployments/your-deployment
OPENAI_MODEL=gpt-4o

# Server Configuration
HOST=localhost
PORT=10002
LOG_LEVEL=info
```

### Option 4: Google Gemini

```env
GEMINI_API_KEY=your-gemini-api-key
OPENAI_MODEL=gemini-2.0-flash-exp

# Server Configuration
HOST=localhost
PORT=10002
LOG_LEVEL=info
```

### Using with Different LLM Providers

The agent automatically detects which provider to use based on the environment variables set:

**Priority Order:**
1. **OpenRouter** (if `OPENROUTER_API_KEY` is set)
2. **OpenAI** (if `OPENAI_API_KEY` is set)
3. **Gemini** (if `GEMINI_API_KEY` is set)

You can also override the base URL for any OpenAI-compatible API:
```env
OPENAI_BASE_URL=https://your-custom-endpoint.com/v1
```

## Running the Agent

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Watch Mode (auto-reload)
```bash
npm run dev:watch
```

## API Endpoints

### Agent Card
```
GET /.well-known/agent.json
```
Returns the agent's capabilities and metadata.

### Health Check
```
GET /health
```
Returns server health status.

### Send Message
```
POST /
Content-Type: application/json

{
  "message": {
    "parts": [
      { "type": "text", "text": "Find me the top 5 Chinese restaurants in New York" }
    ]
  },
  "extensions": ["tag:copilotkit.ai,2025:a2ui"]
}
```

### Streaming Endpoint
```
POST /stream
Content-Type: application/json

{
  "message": {
    "parts": [
      { "type": "text", "text": "Find me the top 5 Chinese restaurants in New York" }
    ]
  }
}
```
Returns Server-Sent Events (SSE) stream.

## Project Structure

```
agent-ts/
├── src/
│   ├── index.ts           # Main entry point and HTTP server
│   ├── agent.ts           # RestaurantAgent class with LLM integration
│   ├── agent-executor.ts  # Request handling and response processing
│   ├── a2ui-extension.ts  # A2UI protocol helpers
│   ├── prompt-builder.ts  # Prompt templates and schemas
│   ├── tools.ts           # Tool definitions and execution
│   ├── restaurant-data.ts # Sample restaurant data
│   ├── logger.ts          # Logging utility
│   └── types.ts           # TypeScript type definitions
├── images/                 # Static images for restaurants
├── package.json
├── tsconfig.json
└── README.md
```

## Comparison with Python Version

| Feature | Python | TypeScript |
|---------|--------|------------|
| Runtime | Python 3.13+ | Node.js 20+ (V8) |
| Framework | Starlette/A2A SDK | Hono |
| LLM SDK | Google ADK + LiteLLM | OpenAI SDK |
| Type Safety | Runtime (Pydantic) | Compile-time (TypeScript) |
| Schema Validation | jsonschema | Ajv |
| Package Manager | uv/pip | npm/pnpm |

## License

Apache License 2.0

## Contributing

See the main repository README for contribution guidelines.
