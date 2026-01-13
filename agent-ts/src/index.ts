/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';

import {
  DefaultRequestHandler,
  InMemoryTaskStore,
  JsonRpcTransportHandler,
  type AgentExecutor,
  type ExecutionEventBus,
  RequestContext as A2ARequestContext,
} from '@a2a-js/sdk/server';
import type { AgentCard, Message, TaskStatus } from '@a2a-js/sdk';

import { RestaurantAgent } from './agent.js';
import {
  tryActivateA2UIExtension,
  createA2UIPart,
  parseUIEvent,
  buildQueryFromUIEvent,
  getA2UIAgentExtension,
} from './a2ui-extension.js';
import { logger } from './logger.js';
import { SERVER_CONFIG, hasLLMProvider, getLLMConfigErrorMessage } from './config.js';

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

/**
 * A2A SDK compatible Agent Executor
 */
class A2AAgentExecutor implements AgentExecutor {
  private uiAgent: RestaurantAgent;
  private textAgent: RestaurantAgent;

  constructor(baseUrl: string) {
    this.uiAgent = new RestaurantAgent(baseUrl, true);
    this.textAgent = new RestaurantAgent(baseUrl, false);
  }

  async execute(requestContext: A2ARequestContext, eventBus: ExecutionEventBus): Promise<void> {
    try {
      const userMessage = requestContext.userMessage;
      const task = requestContext.task;
      
      // Extract extensions from task or message metadata
      const requestedExtensions: string[] = [];
      if (task?.metadata?.extensions) {
        requestedExtensions.push(...(task.metadata.extensions as string[]));
      }

      // Build context for extension check
      const extensionContext = {
        message: {
          parts: userMessage.parts?.map(p => ({
            type: (p.kind === 'text' ? 'text' : 'data') as 'text' | 'data',
            text: p.kind === 'text' ? p.text : undefined,
            data: p.kind === 'data' ? p.data : undefined,
          })) || [],
        },
        current_task: task ? {
          id: task.id,
          context_id: task.contextId,
          state: task.status.state,
        } : null,
        requested_extensions: requestedExtensions,
      };

      logger.info(`--- Client requested extensions: ${JSON.stringify(requestedExtensions)} ---`);
      const useUI = tryActivateA2UIExtension(extensionContext);

      const agent = useUI ? this.uiAgent : this.textAgent;
      logger.info(`--- AGENT_EXECUTOR: ${useUI ? 'A2UI extension is active. Using UI agent.' : 'A2UI extension is not active. Using text agent.'} ---`);

      // Extract query from message parts
      let query = '';
      let action: string | null = null;

      if (userMessage.parts) {
        logger.info(`--- AGENT_EXECUTOR: Processing ${userMessage.parts.length} message parts ---`);
        
        const uiEvent = parseUIEvent(userMessage.parts.map(p => ({
          type: p.kind === 'text' ? 'text' : 'data',
          text: p.kind === 'text' ? p.text : undefined,
          data: p.kind === 'data' ? p.data : undefined,
        })) as Array<{ type: string; data?: Record<string, unknown> }>);
        
        if (uiEvent) {
          logger.info(`Received a2ui ClientEvent: ${JSON.stringify(uiEvent)}`);
          action = uiEvent.actionName;
          query = buildQueryFromUIEvent(uiEvent);
        }
      }

      // Fall back to text input
      if (!query) {
        logger.info('No a2ui UI event part found. Falling back to text input.');
        for (const part of userMessage.parts || []) {
          if (part.kind === 'text' && part.text) {
            query = part.text;
            break;
          }
        }
      }

      logger.info(`--- AGENT_EXECUTOR: Final query for LLM: '${query}' ---`);

      const contextId = requestContext.contextId;

      // Stream responses from agent
      for await (const item of agent.stream(query, contextId)) {
        const isTaskComplete = item.is_task_complete;

        if (!isTaskComplete) {
          // Publish working status update
          eventBus.publish({
            kind: 'status-update',
            taskId: requestContext.taskId,
            contextId: contextId,
            status: {
              state: 'working',
              message: {
                kind: 'message',
                role: 'agent',
                messageId: this.generateId(),
                parts: [{ kind: 'text', text: item.updates || '' }],
              },
            } as TaskStatus,
            final: false,
          });
          continue;
        }

        // Process final response
        const finalState = action === 'submit_booking' ? 'completed' : 'input-required';
        const content = item.content || '';
        const finalParts: Array<{ kind: 'text'; text: string } | { kind: 'data'; data: Record<string, unknown> }> = [];

        if (content.includes('---a2ui_JSON---')) {
          logger.info('Splitting final response into text and UI parts.');
          const [textContent, jsonString] = content.split('---a2ui_JSON---', 2);

          if (textContent?.trim()) {
            finalParts.push({ kind: 'text', text: textContent.trim() });
          }

          if (jsonString?.trim()) {
            try {
              let cleanedJson = jsonString.trim();
              if (cleanedJson.startsWith('```json')) {
                cleanedJson = cleanedJson.slice(7);
              }
              if (cleanedJson.startsWith('```')) {
                cleanedJson = cleanedJson.slice(3);
              }
              if (cleanedJson.endsWith('```')) {
                cleanedJson = cleanedJson.slice(0, -3);
              }
              cleanedJson = cleanedJson.trim();

              const jsonData = JSON.parse(cleanedJson);

              if (Array.isArray(jsonData)) {
                logger.info(`Found ${jsonData.length} messages. Creating individual DataParts.`);
                for (const message of jsonData) {
                  const a2uiPart = createA2UIPart(message);
                  finalParts.push({ kind: 'data', data: a2uiPart.data as Record<string, unknown> });
                }
              } else {
                logger.info('Received a single JSON object. Creating a DataPart.');
                const a2uiPart = createA2UIPart(jsonData);
                finalParts.push({ kind: 'data', data: a2uiPart.data as Record<string, unknown> });
              }
            } catch (e) {
              logger.error(`Failed to parse UI JSON: ${e}`);
              finalParts.push({ kind: 'text', text: jsonString });
            }
          }
        } else {
          finalParts.push({ kind: 'text', text: content.trim() });
        }

        logger.info('--- FINAL PARTS TO BE SENT ---');
        for (let i = 0; i < finalParts.length; i++) {
          const part = finalParts[i];
          if (!part) continue;
          logger.info(`  - Part ${i}: Kind = ${part.kind}`);
          if (part.kind === 'text') {
            logger.info(`    - Text: ${part.text.substring(0, 200)}...`);
          } else {
            logger.info(`    - Data: ${JSON.stringify(part.data).substring(0, 200)}...`);
          }
        }
        logger.info('-----------------------------');

        // Publish final message
        const finalMessage: Message = {
          kind: 'message',
          role: 'agent',
          messageId: this.generateId(),
          parts: finalParts,
        };

        eventBus.publish(finalMessage);

        // Publish final status update
        eventBus.publish({
          kind: 'status-update',
          taskId: requestContext.taskId,
          contextId: contextId,
          status: {
            state: finalState,
            message: finalMessage,
          } as TaskStatus,
          final: true,
        });

        break;
      }
    } catch (error) {
      logger.error(`Error in agent execution: ${error}`);
      
      // Publish error message
      const errorMessage: Message = {
        kind: 'message',
        role: 'agent',
        messageId: this.generateId(),
        parts: [{ kind: 'text', text: `I'm sorry, I encountered an error: ${error}` }],
      };

      eventBus.publish(errorMessage);

      eventBus.publish({
        kind: 'status-update',
        taskId: requestContext.taskId,
        contextId: requestContext.contextId,
        status: {
          state: 'failed',
          message: errorMessage,
        } as TaskStatus,
        final: true,
      });
    } finally {
      eventBus.finished();
    }
  }

  async cancelTask(taskId: string, eventBus: ExecutionEventBus): Promise<void> {
    logger.info(`Canceling task: ${taskId}`);
    eventBus.publish({
      kind: 'status-update',
      taskId: taskId,
      contextId: '',
      status: {
        state: 'canceled',
      } as TaskStatus,
      final: true,
    });
    eventBus.finished();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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

  const baseUrl = `http://${host}:${port}`;

  // Create agent card
  const agentCard: AgentCard = {
    name: 'Restaurant Agent',
    description: 'This agent helps find restaurants based on user criteria.',
    url: baseUrl,
    version: '1.0.0',
    defaultInputModes: RestaurantAgent.SUPPORTED_CONTENT_TYPES,
    defaultOutputModes: RestaurantAgent.SUPPORTED_CONTENT_TYPES,
    capabilities: {
      streaming: true,
      extensions: [getA2UIAgentExtension()],
    },
    skills: [
      {
        id: 'find_restaurants',
        name: 'Find Restaurants Tool',
        description: 'Helps find restaurants based on user criteria (e.g., cuisine, location).',
        tags: ['restaurant', 'finder'],
        examples: ['Find me the top 10 chinese restaurants in the US'],
      },
    ],
  };

  // Create A2A components
  const taskStore = new InMemoryTaskStore();
  const agentExecutor = new A2AAgentExecutor(baseUrl);
  const requestHandler = new DefaultRequestHandler(agentCard, taskStore, agentExecutor);
  const jsonRpcHandler = new JsonRpcTransportHandler(requestHandler);

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
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              } catch (error) {
                logger.error(`Streaming error: ${error}`);
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(error) })}\n\n`));
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
