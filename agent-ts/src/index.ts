import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';


import { logger } from './logger.js';
import { SERVER_CONFIG, hasLLMProvider, getLLMConfigErrorMessage, baseUrl } from './config.js';
import { agentCard } from './agentcard.js';
import { jsonRpcHandler } from './agent-executor.js';

// Load environment variables (simple implementation for Node.js)
function loadEnv(): void {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const envPath = join(__dirname, '..', '.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      for (const line of envContent.split('\n')) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = value;
            }
          }
        }
      }
    }
  } catch (error) {
    logger.warn(`Could not load .env file: ${error}`);
  }
}

// Main server function
async function main(): Promise<void> {
  loadEnv();

  const host = SERVER_CONFIG.host;
  const port = SERVER_CONFIG.port;

  // Validate API key
  if (!hasLLMProvider()) {
    logger.error(getLLMConfigErrorMessage());
    process.exit(1);
  }

  // Create Hono app
  const app = new Hono();

  // CORS middleware
  app.use('*', cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }));

  // Serve static files (images)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const imagesDir = join(__dirname, '..', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  app.use('/static/*', serveStatic({ root: join(__dirname, '..') }));

  // Agent card endpoint (A2A protocol)
  app.get('/.well-known/agent-card.json', (c) => {
    return c.json(agentCard);
  });

  app.get('/.well-known/agent.json', (c) => {
    return c.json(agentCard);
  });


  // Health check
  app.get('/health', (c) => {
    return c.json({ status: 'ok' });
  });

  // Main JSON-RPC endpoint (A2A protocol)
  app.post('/', async (c) => {
    try {
      const body = await c.req.json();
      logger.info(`Received request: ${JSON.stringify(body).substring(0, 500)}`);

      const result = await jsonRpcHandler.handle(body);
      const requestId = body.id;

      // Check if result is an async generator (streaming)
      if (result && typeof result === 'object' && Symbol.asyncIterator in result) {
        // Handle streaming response with SSE
        c.header('Content-Type', 'text/event-stream');
        c.header('Cache-Control', 'no-cache');
        c.header('Connection', 'keep-alive');

        return new Response(
          new ReadableStream({
            async start(controller) {
              const encoder = new TextEncoder();
              try {
                for await (const event of result as AsyncGenerator) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
                }
                // Send proper JSON-formatted completion event with ID
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ jsonrpc: '2.0', result: 'success', id: requestId })}\n\n`));
              } catch (error) {
                logger.error(`Streaming error: ${error}`);
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: String(error) }, id: requestId })}\n\n`));
              } finally {
                controller.close();
              }
            },
          }),
          {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          }
        );
      }

      // Non-streaming response
      return c.json(result);

    } catch (error) {
      logger.error(`Error processing request: ${error}`);
      return c.json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: `Internal server error: ${error}`,
        },
        id: null,
      }, 500);
    }
  });

  // Start server
  logger.info(`Starting Restaurant Agent server at ${baseUrl}`);
  logger.info(`Agent card available at ${baseUrl}/.well-known/agent.json`);

  serve({
    fetch: app.fetch,
    hostname: host,
    port,
  }, (info) => {
    logger.info(`Server is running on http://${info.address}:${info.port}`);
  });
}

// Run main
main().catch((error) => {
  logger.error(`Failed to start server: ${error}`);
  process.exit(1);
});
