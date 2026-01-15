import {
  type AgentExecutor,
  type ExecutionEventBus,
  RequestContext as A2ARequestContext,
  DefaultRequestHandler,
  InMemoryTaskStore,
  JsonRpcTransportHandler,
} from '@a2a-js/sdk/server';
import type { Message, TaskStatus } from '@a2a-js/sdk';

import { RestaurantAgent } from './agent.js';
import {
  tryActivateA2UIExtension,
  createA2UIPart,
  parseUIEvent,
  buildQueryFromUIEvent,
} from './a2ui-extension.js';
import { logger } from './logger.js';
import { baseUrl } from './config.js';
import { agentCard } from './agentcard.js';

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

  // Create A2A components
  const taskStore = new InMemoryTaskStore();
  const agentExecutor = new A2AAgentExecutor(baseUrl);
  const requestHandler = new DefaultRequestHandler(agentCard, taskStore, agentExecutor);
export const jsonRpcHandler = new JsonRpcTransportHandler(requestHandler);
