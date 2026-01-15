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

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { A2AExpressApp, UserBuilder } = require('@a2a-js/sdk/server/express');
const { DefaultRequestHandler, InMemoryTaskStore } = require('@a2a-js/sdk/server');
const RestaurantAgentExecutor = require('./agent_executor');
const { try_activate_a2ui_extension } = require('./a2ui_extension');

// Load environment variables
dotenv.config();

// Set up logging
console.log('=== Restaurant Agent Server ===');

/**
 * Exception for missing API key.
 */
class MissingAPIKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingAPIKeyError';
  }
}

/**
 * Main server function
 * @param {Object} options - Server options
 * @param {string} options.host - Hostname to listen on
 * @param {number} options.port - Port to listen on
 */
async function main(options = {}) {
  const { host = 'localhost', port = 10002 } = options;
  
  try {
    // Check for appropriate API key based on the selected model
    // const model = process.env.LITELLM_MODEL || 'gemini/gemini-2.5-flash';
    // if (process.env.GOOGLE_GENAI_USE_VERTEXAI !== 'TRUE') {
    //   if (model.toLowerCase().includes('gemini') && !process.env.GEMINI_API_KEY) {
    //     throw new MissingAPIKeyError(
    //       'GEMINI_API_KEY environment variable not set for Gemini model.'
    //     );
    //   } else if (model.toLowerCase().includes('dashscope') && !process.env.DASHSCOPE_API_KEY) {
    //     throw new MissingAPIKeyError(
    //       'DASHSCOPE_API_KEY environment variable not set for Qwen model.'
    //     );
    //   }
    // }

    // Create capabilities
    const capabilities = {
      streaming: true,
      extensions: [
        {
          uri: 'a2ui',
          name: 'A2UI Extension',
          description: 'Provides UI components for restaurant finder',
          security: []
        }
      ]
    };

    // Create skill
    const skill = {
      id: 'find_restaurants',
      name: 'Find Restaurants Tool',
      description: 'Helps find restaurants based on user criteria (e.g., cuisine, location).',
      tags: ['restaurant', 'finder'],
      examples: ['Find me the top 10 chinese restaurants in the US']
    };

    const base_url = `http://${host}:${port}`;

    // Create agent card
    const agent_card = {
      name: 'Restaurant Agent',
      description: 'This agent helps find restaurants based on user criteria.',
      url: base_url,
      version: '1.0.0',
      default_input_modes: ['text/plain', 'application/json'],
      default_output_modes: ['text/plain', 'application/json'],
      capabilities: capabilities,
      skills: [skill]
    };

    // Create agent executor and request handler
    const agent_executor = new RestaurantAgentExecutor(base_url);
    const request_handler = new DefaultRequestHandler(
      agent_card,
      new InMemoryTaskStore(),
      agent_executor
    );

    // Create Express app
    const app = express();

    // Add CORS middleware
    app.use(cors({
      origin: /http:\/\/localhost:\d+/,
      credentials: true,
      methods: ['*'],
      allowedHeaders: ['*']
    }));

    // Serve static files
    app.use('/static', express.static(path.join(__dirname, '../images')));
    console.log(`mount: ${path.join(__dirname, '../images')}`)

    // Set up A2A Express app
    const a2aExpressApp = new A2AExpressApp(request_handler, UserBuilder.noAuthentication);
    a2aExpressApp.setupRoutes(app);

    // Start server
    app.listen(port, host, () => {
      console.log(`Server listening on ${host}:${port}`);
      console.log(`Agent card available at: http://${host}:${port}/.well-known/agent-card.json`);
    });

  } catch (error) {
    if (error instanceof MissingAPIKeyError) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`An error occurred during server startup: ${error}`);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i += 2) {
  const arg = args[i];
  const value = args[i + 1];
  
  if (arg === '--host') {
    options.host = value;
  } else if (arg === '--port') {
    options.port = parseInt(value, 10);
  }
}

// Run the server
main(options);
