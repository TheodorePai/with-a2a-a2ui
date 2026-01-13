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

import { restaurantData } from './restaurant-data.js';
import type { Restaurant, ToolContext } from './types.js';
import { logger } from './logger.js';

/**
 * Get a list of restaurants based on cuisine and location.
 * @param cuisine - The type of cuisine to search for
 * @param location - The location to search in
 * @param count - The number of restaurants to return (default: 5)
 * @param toolContext - The tool context containing state
 * @returns JSON string of restaurant data
 */
export function getRestaurants(
  cuisine: string,
  location: string,
  count: number = 5,
  toolContext?: ToolContext
): string {
  logger.info(`--- TOOL CALLED: getRestaurants (count: ${count}) ---`);
  logger.info(`  - Cuisine: ${cuisine}`);
  logger.info(`  - Location: ${location}`);

  let items: Restaurant[] = [];

  if (location.toLowerCase().includes('new york') || location.toLowerCase().includes('ny')) {
    // Get base URL from context if available
    const baseUrl = toolContext?.state?.base_url as string | undefined;
    
    // Create a copy of the data and update URLs if needed
    let data = [...restaurantData];
    
    if (baseUrl) {
      data = data.map(restaurant => ({
        ...restaurant,
        imageUrl: restaurant.imageUrl.replace('http://localhost:10002', baseUrl)
      }));
      logger.info(`Updated base URL from tool context: ${baseUrl}`);
    }

    // Slice the list to return only the requested number of items
    items = data.slice(0, count);
    logger.info(`  - Success: Found ${restaurantData.length} restaurants, returning ${items.length}.`);
  }

  return JSON.stringify(items);
}

/**
 * Tool definitions for OpenAI function calling
 */
export const toolDefinitions = [
  {
    type: 'function' as const,
    function: {
      name: 'get_restaurants',
      description: 'Get a list of restaurants based on a cuisine and location. \'count\' is the number of restaurants to return.',
      parameters: {
        type: 'object',
        properties: {
          cuisine: {
            type: 'string',
            description: 'The type of cuisine to search for (e.g., Chinese, Italian, Mexican)'
          },
          location: {
            type: 'string',
            description: 'The location to search for restaurants (e.g., New York, NY)'
          },
          count: {
            type: 'number',
            description: 'The number of restaurants to return (default: 5)'
          }
        },
        required: ['cuisine', 'location']
      }
    }
  }
];

/**
 * Execute a tool by name with given arguments
 */
export function executeTool(
  toolName: string,
  args: Record<string, unknown>,
  toolContext?: ToolContext
): string {
  switch (toolName) {
    case 'get_restaurants':
      return getRestaurants(
        args.cuisine as string,
        args.location as string,
        (args.count as number) ?? 5,
        toolContext
      );
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
