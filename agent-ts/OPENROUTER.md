# OpenRouter Integration Guide

This agent supports [OpenRouter](https://openrouter.ai/), which provides access to multiple AI models through a single, unified API.

## Why OpenRouter?

- **Multiple Models**: Access Claude, GPT-4, Gemini, Llama, and more through one API
- **Cost Effective**: Pay only for what you use with competitive pricing
- **Easy Setup**: Single API key for all models
- **Model Comparison**: Easily switch between models to find the best one for your use case
- **No Rate Limits**: Unlike free tiers, OpenRouter provides reliable access

## Quick Start

### 1. Get Your API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign in with your Google, GitHub, or Discord account
3. Go to [Keys](https://openrouter.ai/keys) and create a new API key
4. Add some credits to your account (as low as $5)

### 2. Configure the Agent

Create a `.env` file in the `agent-ts` directory:

```env
# OpenRouter Configuration
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# Optional: Add your app info
OPENROUTER_APP_NAME=A2UI Restaurant Agent
OPENROUTER_REFERER=https://github.com/CopilotKit/with-a2a-a2ui

# Server Configuration
HOST=localhost
PORT=10002
LOG_LEVEL=info
```

### 3. Run the Agent

```bash
npm run dev
```

## Recommended Models

### For Production (Best Quality)

```env
# Claude 3.5 Sonnet - Excellent reasoning, very capable
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# GPT-4o - Latest OpenAI model, great all-around
OPENROUTER_MODEL=openai/gpt-4o

# Gemini 2.0 Flash - Fast and capable, good balance
OPENROUTER_MODEL=google/gemini-2.0-flash-exp
```

### For Development (Cost Effective)

```env
# GPT-4o Mini - Good quality, very affordable
OPENROUTER_MODEL=openai/gpt-4o-mini

# Claude 3 Haiku - Fast and cheap, good for testing
OPENROUTER_MODEL=anthropic/claude-3-haiku

# Gemini Flash - Free tier available, fast responses
OPENROUTER_MODEL=google/gemini-flash-1.5
```

### For Open Source

```env
# Llama 3.3 70B - Excellent open source model
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct

# Qwen 2.5 72B - Strong Chinese and English support
OPENROUTER_MODEL=qwen/qwen-2.5-72b-instruct
```

## Model Pricing

Visit [OpenRouter Models](https://openrouter.ai/models) to see current pricing for all models.

Example costs (as of Jan 2025):
- **Claude 3.5 Sonnet**: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- **GPT-4o**: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens
- **GPT-4o Mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Gemini Flash**: Free tier available, then ~$0.075 per 1M tokens

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `OPENROUTER_API_KEY` | Yes | Your OpenRouter API key | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | No | Model to use (default: claude-3.5-sonnet) | `openai/gpt-4o` |
| `OPENROUTER_APP_NAME` | No | Your app name for OpenRouter rankings | `My Restaurant Agent` |
| `OPENROUTER_REFERER` | No | Your app URL for OpenRouter rankings | `https://github.com/user/repo` |

## Switching Models

You can easily switch between models by changing the `OPENROUTER_MODEL` environment variable:

```bash
# Try Claude
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet npm run dev

# Try GPT-4
OPENROUTER_MODEL=openai/gpt-4o npm run dev

# Try Gemini
OPENROUTER_MODEL=google/gemini-2.0-flash-exp npm run dev
```

## Troubleshooting

### "No LLM API key found" Error

Make sure your `.env` file has the `OPENROUTER_API_KEY` set:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key
```

### Model Not Found

Check the [OpenRouter Models](https://openrouter.ai/models) page for the correct model ID. Model IDs use the format `provider/model-name`.

### Rate Limits

OpenRouter has generous rate limits. If you hit them, you can:
1. Wait a few seconds and retry
2. Upgrade to a paid tier
3. Switch to a different model

### Cost Concerns

- Start with free tier models like Gemini Flash
- Use mini/haiku versions for development
- Monitor usage on the [OpenRouter Dashboard](https://openrouter.ai/activity)
- Set up spending limits in your OpenRouter account settings

## Advanced Configuration

### Custom Headers

The agent automatically sets recommended headers:
- `HTTP-Referer`: For OpenRouter rankings (from `OPENROUTER_REFERER`)
- `X-Title`: App name (from `OPENROUTER_APP_NAME`)

### Multiple Providers

You can have multiple API keys configured. The agent will prioritize in this order:
1. OpenRouter (if `OPENROUTER_API_KEY` is set)
2. OpenAI (if `OPENAI_API_KEY` is set)
3. Gemini (if `GEMINI_API_KEY` is set)

Simply comment out the `OPENROUTER_API_KEY` to fall back to other providers.

## Resources

- [OpenRouter Homepage](https://openrouter.ai/)
- [OpenRouter Models](https://openrouter.ai/models)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [OpenRouter API Keys](https://openrouter.ai/keys)
- [OpenRouter Discord](https://discord.gg/openrouter)
