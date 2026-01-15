// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { AgentExecutor, RequestContext, ExecutionEventBus, A2AError} = require('@a2a-js/sdk/server');
const { try_activate_a2ui_extension, create_a2ui_part } = require('./a2ui_extension');
const { v4 } = require('uuid');
const RestaurantAgent = require('./agent');

/**
 * Restaurant AgentExecutor Example.
 * Implements the AgentExecutor interface from @a2a-js/sdk/server
 */
class RestaurantAgentExecutor {
  /**
   * @param {string} base_url - The base URL for the agent
   */
  constructor(base_url) {
    // Instantiate two agents: one for UI and one for text-only.
    // The appropriate one will be chosen at execution time.
    this.ui_agent = new RestaurantAgent(base_url, true);
    this.text_agent = new RestaurantAgent(base_url, false);
  }

  /**
   * Executes the agent logic based on the request context and publishes events.
   * @param {RequestContext} requestContext - The context of the current request
   * @param {ExecutionEventBus} eventBus - The bus to publish execution events to
   * @returns {Promise<void>}
   */
  async execute(requestContext, eventBus) {
    let query = "";
    let ui_event_part = null;
    let action = null;

    console.info(`--- Client requested extensions: ${requestContext.context?.requestedExtensions || []} ---`);
    const use_ui = try_activate_a2ui_extension(requestContext);

    // Determine which agent to use based on whether the a2ui extension is active.
    const agent = use_ui ? this.ui_agent : this.text_agent;
    
    console.info(`--- AGENT_EXECUTOR: A2UI extension is ${use_ui ? 'active. Using UI agent.' : 'not active. Using text agent.'} ---`);

    if (requestContext.userMessage && requestContext.userMessage.parts) {
      console.info(`--- AGENT_EXECUTOR: Processing ${requestContext.userMessage.parts.length} message parts ---`);
      
      for (let i = 0; i < requestContext.userMessage.parts.length; i++) {
        const part = requestContext.userMessage.parts[i];
        if (part.kind === 'data') {
          if (part.data && 'userAction' in part.data) {
            console.info(`  Part ${i}: Found a2ui UI ClientEvent payload.`);
            ui_event_part = part.data.userAction;
          } else {
            console.info(`  Part ${i}: DataPart (data: ${JSON.stringify(part.data)})`);
          }
        } else if (part.kind === 'text') {
          console.info(`  Part ${i}: TextPart (text: ${part.text})`);
        } else {
          console.info(`  Part ${i}: Unknown part type (${part.kind})`);
        }
      }
    }

    if (ui_event_part) {
      console.info(`Received a2ui ClientEvent: ${JSON.stringify(ui_event_part)}`);
      action = ui_event_part.actionName;
      const ctx = ui_event_part.context || {};

      if (action === 'book_restaurant') {
        const restaurant_name = ctx.restaurantName || 'Unknown Restaurant';
        const address = ctx.address || 'Address not provided';
        const image_url = ctx.imageUrl || '';
        query = `USER_WANTS_TO_BOOK: ${restaurant_name}, Address: ${address}, ImageURL: ${image_url}`;

      } else if (action === 'submit_booking') {
        const restaurant_name = ctx.restaurantName || 'Unknown Restaurant';
        const party_size = ctx.partySize || 'Unknown Size';
        const reservation_time = ctx.reservationTime || 'Unknown Time';
        const dietary_reqs = ctx.dietary || 'None';
        const image_url = ctx.imageUrl || '';
        query = `User submitted a booking for ${restaurant_name} for ${party_size} people at ${reservation_time} with dietary requirements: ${dietary_reqs}. The image URL is ${image_url}`;

      } else {
        query = `User submitted an event: ${action} with data: ${JSON.stringify(ctx)}`;
      }
    } else {
      console.info('No a2ui UI event part found. Falling back to text input.');
      // Extract text from all text parts
      query = requestContext.userMessage.parts
        .filter(part => part.kind === 'text')
        .map(part => part.text)
        .join(' ');
    }

    console.info(`--- AGENT_EXECUTOR: Final query for LLM: '${query}' ---`);

    let task = requestContext.task;

    if (!task) {
        console.info('No task found in requestContext. Creating a new task.');
      // Create a new task if not provided
      task = {
        id: requestContext.taskId,
        contextId: requestContext.contextId,
        status: {
          state: 'working',
          timestamp: new Date().toISOString()
        },
        history: [requestContext.userMessage],
        kind: 'task'
      };
      // Publish the new task event
      eventBus.publish(task);
      console.log(`New task created: ${JSON.stringify(task)}`);
    }

    try {
      // Use the agent's stream method to get results
      for await (const item of agent.stream(query, task.contextId)) {
        const is_task_complete = item.is_task_complete;
        
        if (!is_task_complete) {
          // Update task status with working state and intermediate updates
          const statusUpdate = {
            kind: 'status-update',
            taskId: task.id,
            contextId: task.contextId,
            status: {
              state: 'working',
              message: {
                kind: 'message',
                role: 'agent',
                messageId: `agent-message-${Date.now()}`,
                parts: [{ kind: 'text', text: item.updates }],
                taskId: task.id,
                contextId: task.contextId
              },
              timestamp: new Date().toISOString()
            },
            final: false
          };
          eventBus.publish(statusUpdate);
          continue;
        }

        const final_state = action === 'submit_booking' ? 'completed' : 'input_required';
        const content = item.content;
        const final_parts = [];
        
        if (content && content.includes('---a2ui_JSON---')) {
          console.info('Splitting final response into text and UI parts.');
          const [text_content, json_string] = content.split('---a2ui_JSON---', 2);

          if (text_content?.trim()) {
            final_parts.push({ kind: 'text', text: text_content.trim() });
          }

          if (json_string?.trim()) {
            try {
              const json_string_cleaned = json_string
                .trim()
                .replace(/^```json/, '')
                .replace(/```$/, '')
                .trim();
              
              const json_data = JSON.parse(json_string_cleaned);

              if (Array.isArray(json_data)) {
                console.info(`Found ${json_data.length} messages. Creating individual DataParts.`);
                for (const message of json_data) {
                  final_parts.push(create_a2ui_part(message));
                }
              } else {
                // Handle the case where a single JSON object is returned
                console.info('Received a single JSON object. Creating a DataPart.');
                final_parts.push(create_a2ui_part(json_data));
              }

            } catch (e) {
              console.error(`Failed to parse UI JSON: ${e}`);
              final_parts.push({ kind: 'text', text: json_string });
            }
          }
        } else {
          final_parts.push({ kind: 'text', text: content?.trim() || '' });
        }

        console.info('--- FINAL PARTS TO BE SENT ---');
        for (let i = 0; i < final_parts.length; i++) {
          const part = final_parts[i];
          console.info(`  - Part ${i}: Type = ${part.kind}`);
          if (part.kind === 'text') {
            console.info(`    - Text: ${part.text.substring(0, 200)}${part.text.length > 200 ? '...' : ''}`);
          } else if (part.kind === 'data') {
            console.info(`    - Data: ${JSON.stringify(part.data).substring(0, 200)}${JSON.stringify(part.data).length > 200 ? '...' : ''}`);
          }
        }
        console.info('-----------------------------');

        console.info('final_state:', final_state);
        // Publish final status update
        const finalStatusUpdate = {
          kind: 'status-update',
          taskId: task.id,
          contextId: task.contextId,
          status: {
            state: final_state,
            message: {
              kind: 'message',
              role: 'agent',
              messageId: v4(),
              parts: final_parts,
              taskId: task.id,
              contextId: task.contextId
            },
            timestamp: new Date().toISOString()
          },
          final: final_state === 'completed'
        };

        // Publish the message and signal that the interaction is finished.
        // eventBus.publish(responseMessage);
        // const finalUpdate = {
        //   kind: 'status-update',
        //   taskId: task.id,
        //   contextId: task.contextId,
        //   status: { state: final_state, timestamp: new Date().toISOString() },
        //   final: true,
        // };
        // eventBus.publish(finalUpdate);
        console.log('eventBus publish finalStatusUpdate:', finalStatusUpdate);
        eventBus.publish(finalStatusUpdate);
        break;
      }
    } catch (error) {
      console.error('Agent execution failed:', error);
      
      // Publish error status update
      const errorStatusUpdate = {
        kind: 'status-update',
        taskId: task.id,
        contextId: task.contextId,
        status: {
          state: 'failed',
          message: {
            kind: 'message',
            role: 'agent',
            messageId: `agent-message-${Date.now()}`,
            parts: [{ kind: 'text', text: `Agent execution failed: ${error.message}` }],
            taskId: task.id,
            contextId: task.contextId
          },
          timestamp: new Date().toISOString()
        },
        final: true
      };
      
      eventBus.publish(errorStatusUpdate);
    } finally {
      // Signal that execution is finished
      eventBus.finished();
    }
  }

  /**
   * Method to explicitly cancel a running task.
   * @param {string} taskId - The ID of the task to cancel
   * @param {ExecutionEventBus} eventBus - The event bus associated with the task's execution
   * @returns {Promise<void>}
   */
  async cancelTask(taskId, eventBus) {
    // Publish canceled status update
    const cancelStatusUpdate = {
      kind: 'status-update',
      taskId: taskId,
      contextId: taskId, // Use taskId as contextId if not available
      status: {
        state: 'canceled',
        message: {
          kind: 'message',
          role: 'agent',
          messageId: `agent-message-${Date.now()}`,
          parts: [{ kind: 'text', text: 'Task canceled by user' }],
          taskId: taskId,
          contextId: taskId
        },
        timestamp: new Date().toISOString()
      },
      final: true
    };
    
    eventBus.publish(cancelStatusUpdate);
    eventBus.finished();
  }
}

module.exports = RestaurantAgentExecutor;
