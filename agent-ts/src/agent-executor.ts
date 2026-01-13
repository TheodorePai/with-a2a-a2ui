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

import { RestaurantAgent } from './agent.js';
import {
  tryActivateA2UIExtension,
  createA2UIPart,
  parseUIEvent,
  buildQueryFromUIEvent,
} from './a2ui-extension.js';
import { logger } from './logger.js';
import type { RequestContext, TaskState } from './types.js';

export class RestaurantAgentExecutor {
  private uiAgent: RestaurantAgent;
  private textAgent: RestaurantAgent;

  constructor(baseUrl: string) {
    // Instantiate two agents: one for UI and one for text-only
    this.uiAgent = new RestaurantAgent(baseUrl, true);
    this.textAgent = new RestaurantAgent(baseUrl, false);
  }

  async execute(
    context: RequestContext,
    onUpdate: (data: {
      state: TaskState;
      parts: Array<{ type: string; text?: string; data?: Record<string, unknown> }>;
      isFinal?: boolean;
    }) => Promise<void>
  ): Promise<void> {
    let query = '';
    let uiEventPart = null;
    let action: string | null = null;

    logger.info(`--- Client requested extensions: ${JSON.stringify(context.requested_extensions)} ---`);
    const useUI = tryActivateA2UIExtension(context);

    // Determine which agent to use
    const agent = useUI ? this.uiAgent : this.textAgent;
    logger.info(`--- AGENT_EXECUTOR: ${useUI ? 'A2UI extension is active. Using UI agent.' : 'A2UI extension is not active. Using text agent.'} ---`);

    // Process message parts
    if (context.message?.parts) {
      logger.info(`--- AGENT_EXECUTOR: Processing ${context.message.parts.length} message parts ---`);
      
      const uiEvent = parseUIEvent(context.message.parts as Array<{ type: string; data?: Record<string, unknown> }>);
      if (uiEvent) {
        logger.info(`Received a2ui ClientEvent: ${JSON.stringify(uiEvent)}`);
        uiEventPart = uiEvent;
        action = uiEvent.actionName;
        query = buildQueryFromUIEvent(uiEvent);
      }
    }

    // Fall back to text input if no UI event
    if (!uiEventPart) {
      logger.info('No a2ui UI event part found. Falling back to text input.');
      query = this.getUserInput(context);
    }

    logger.info(`--- AGENT_EXECUTOR: Final query for LLM: '${query}' ---`);

    const task = context.current_task;
    const contextId = task?.context_id || this.generateId();

    // Stream responses from agent
    for await (const item of agent.stream(query, contextId)) {
      const isTaskComplete = item.is_task_complete;

      if (!isTaskComplete) {
        await onUpdate({
          state: 'working' as TaskState,
          parts: [{ type: 'text', text: item.updates }],
        });
        continue;
      }

      const finalState = action === 'submit_booking' ? 'completed' : 'input_required';
      const content = item.content || '';
      const finalParts: Array<{ type: string; text?: string; data?: Record<string, unknown> }> = [];

      if (content.includes('---a2ui_JSON---')) {
        logger.info('Splitting final response into text and UI parts.');
        const [textContent, jsonString] = content.split('---a2ui_JSON---', 2);

        if (textContent?.trim()) {
          finalParts.push({ type: 'text', text: textContent.trim() });
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
                finalParts.push(createA2UIPart(message));
              }
            } else {
              logger.info('Received a single JSON object. Creating a DataPart.');
              finalParts.push(createA2UIPart(jsonData));
            }
          } catch (e) {
            logger.error(`Failed to parse UI JSON: ${e}`);
            finalParts.push({ type: 'text', text: jsonString });
          }
        }
      } else {
        finalParts.push({ type: 'text', text: content.trim() });
      }

      logger.info('--- FINAL PARTS TO BE SENT ---');
      for (let i = 0; i < finalParts.length; i++) {
        const part = finalParts[i];
        if (!part) continue;
        logger.info(`  - Part ${i}: Type = ${part.type}`);
        if (part.type === 'text') {
          logger.info(`    - Text: ${(part.text || '').substring(0, 200)}...`);
        } else {
          logger.info(`    - Data: ${JSON.stringify(part.data).substring(0, 200)}...`);
        }
      }
      logger.info('-----------------------------');

      await onUpdate({
        state: finalState as TaskState,
        parts: finalParts,
        isFinal: finalState === 'completed',
      });
      break;
    }
  }

  private getUserInput(context: RequestContext): string {
    if (context.message?.parts) {
      for (const part of context.message.parts) {
        if (part.type === 'text' && part.text) {
          return part.text;
        }
      }
    }
    return '';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
