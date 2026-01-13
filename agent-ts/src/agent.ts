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

import OpenAI from 'openai';
import Ajv from 'ajv';
import { AGENT_INSTRUCTION, A2UI_SCHEMA, getUIPrompt, getTextPrompt } from './prompt-builder.js';
import { toolDefinitions, executeTool } from './tools.js';
import { logger } from './logger.js';
import { getActiveLLMProvider, getModelName } from './config.js';
import type { StreamResult, ToolContext } from './types.js';

const ajv = new Ajv({ allErrors: true, strict: false });

// Create a schema for validating an array of A2UI messages
const a2uiArraySchema = { type: 'array', items: A2UI_SCHEMA };
const validateA2UI = ajv.compile(a2uiArraySchema);

export class RestaurantAgent {
  static readonly SUPPORTED_CONTENT_TYPES = ['text', 'text/plain'];

  private baseUrl: string;
  private useUI: boolean;
  private openai: OpenAI;
  private model: string;
  private sessions: Map<string, { messages: OpenAI.Chat.ChatCompletionMessageParam[], state: Record<string, unknown> }>;

  constructor(baseUrl: string, useUI: boolean = false) {
    this.baseUrl = baseUrl;
    this.useUI = useUI;
    this.sessions = new Map();

    // Get active LLM provider configuration
    const provider = getActiveLLMProvider();
    
    if (!provider) {
      throw new Error('No LLM provider configured. Please set OPENROUTER_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY.');
    }

    logger.info(`Using ${provider.name} as LLM provider`);
    
    const openaiConfig: ConstructorParameters<typeof OpenAI>[0] = {
      apiKey: provider.apiKey,
      baseURL: provider.baseUrl,
    };

    // Add provider-specific headers if available
    if (provider.headers) {
      openaiConfig.defaultHeaders = provider.headers;
    }

    this.openai = new OpenAI(openaiConfig);
    this.model = getModelName();
    
    logger.info(`RestaurantAgent initialized with model: ${this.model}, useUI: ${this.useUI}`);
  }

  getProcessingMessage(): string {
    return 'Finding restaurants that match your criteria...';
  }

  private getSystemPrompt(): string {
    if (this.useUI) {
      return AGENT_INSTRUCTION + getUIPrompt(this.baseUrl);
    }
    return getTextPrompt();
  }

  private getOrCreateSession(sessionId: string): { messages: OpenAI.Chat.ChatCompletionMessageParam[], state: Record<string, unknown> } {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        messages: [{ role: 'system', content: this.getSystemPrompt() }],
        state: { base_url: this.baseUrl }
      });
    }
    return this.sessions.get(sessionId)!;
  }

  async *stream(query: string, sessionId: string): AsyncGenerator<StreamResult> {
    const session = this.getOrCreateSession(sessionId);
    const toolContext: ToolContext = { state: session.state };

    const maxRetries = 1;
    let attempt = 0;
    let currentQuery = query;

    while (attempt <= maxRetries) {
      attempt++;
      logger.info(`--- RestaurantAgent.stream: Attempt ${attempt}/${maxRetries + 1} for session ${sessionId} ---`);

      // Add user message
      session.messages.push({ role: 'user', content: currentQuery });

      try {
        // Yield processing message
        yield { is_task_complete: false, updates: this.getProcessingMessage() };

        // Call OpenAI API
        let response = await this.openai.chat.completions.create({
          model: this.model,
          messages: session.messages,
          tools: toolDefinitions,
          tool_choice: 'auto',
        });

        let assistantMessage = response.choices[0]?.message;

        // Handle tool calls
        while (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
          logger.info(`Processing ${assistantMessage.tool_calls.length} tool calls`);
          
          session.messages.push(assistantMessage);

          for (const toolCall of assistantMessage.tool_calls) {
            const toolName = toolCall.function.name;
            const toolArgs = JSON.parse(toolCall.function.arguments);
            
            logger.info(`Executing tool: ${toolName} with args: ${JSON.stringify(toolArgs)}`);
            
            const toolResult = executeTool(toolName, toolArgs, toolContext);
            
            session.messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: toolResult,
            });
          }

          // Get next response after tool execution
          response = await this.openai.chat.completions.create({
            model: this.model,
            messages: session.messages,
            tools: toolDefinitions,
            tool_choice: 'auto',
          });

          assistantMessage = response.choices[0]?.message;
        }

        const finalContent = assistantMessage?.content || '';
        
        if (!finalContent) {
          logger.warn(`No final response content (Attempt ${attempt})`);
          if (attempt <= maxRetries) {
            currentQuery = `I received no response. Please try again. Please retry the original request: '${query}'`;
            continue;
          }
          yield { is_task_complete: true, content: "I'm sorry, I encountered an error and couldn't process your request." };
          return;
        }

        // Add assistant response to session
        session.messages.push({ role: 'assistant', content: finalContent });

        // Validate UI response if needed
        if (this.useUI) {
          const validationResult = this.validateUIResponse(finalContent);
          if (validationResult.isValid) {
            logger.info(`Response is valid (Attempt ${attempt})`);
            yield { is_task_complete: true, content: finalContent };
            return;
          } else {
            logger.warn(`A2UI validation failed: ${validationResult.error} (Attempt ${attempt})`);
            if (attempt <= maxRetries) {
              currentQuery = `Your previous response was invalid. ${validationResult.error} ` +
                `You MUST generate a valid response that strictly follows the A2UI JSON SCHEMA. ` +
                `The response MUST be a JSON list of A2UI messages. ` +
                `Ensure the response is split by '---a2ui_JSON---' and the JSON part is well-formed. ` +
                `Please retry the original request: '${query}'`;
              continue;
            }
          }
        } else {
          // Text-only response is always valid
          yield { is_task_complete: true, content: finalContent };
          return;
        }

      } catch (error) {
        logger.error(`Error in stream: ${error}`);
        if (attempt <= maxRetries) {
          currentQuery = `An error occurred. Please retry the original request: '${query}'`;
          continue;
        }
        yield { is_task_complete: true, content: "I'm sorry, I encountered an error and couldn't process your request." };
        return;
      }
    }

    // Max retries exhausted
    logger.error('Max retries exhausted. Sending text-only error.');
    yield {
      is_task_complete: true,
      content: "I'm sorry, I'm having trouble generating the interface for that request right now. Please try again in a moment."
    };
  }

  private validateUIResponse(content: string): { isValid: boolean; error?: string } {
    try {
      if (!content.includes('---a2ui_JSON---')) {
        return { isValid: false, error: "Delimiter '---a2ui_JSON---' not found." };
      }

      const [, jsonString] = content.split('---a2ui_JSON---', 2);
      
      if (!jsonString?.trim()) {
        return { isValid: false, error: 'JSON part is empty.' };
      }

      // Clean the JSON string (remove markdown code blocks if present)
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

      if (!cleanedJson) {
        return { isValid: false, error: 'Cleaned JSON string is empty.' };
      }

      // Parse JSON
      const parsedJson = JSON.parse(cleanedJson);

      // Validate against schema
      const valid = validateA2UI(parsedJson);
      if (!valid) {
        return { 
          isValid: false, 
          error: `Schema validation failed: ${ajv.errorsText(validateA2UI.errors)}` 
        };
      }

      return { isValid: true };

    } catch (error) {
      return { isValid: false, error: `Validation error: ${error}` };
    }
  }
}
