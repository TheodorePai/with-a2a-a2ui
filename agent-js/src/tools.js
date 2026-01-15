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

const fs = require('fs');
const path = require('path');
// Import FunctionTool from ADK
const { FunctionTool,ToolContext } = require('@google/adk');
// Import zod for parameter validation
const { z } = require('zod');

/**
 * 获取餐厅列表的工具实现
 * @param {Object} params - 包含 cuisine, location, count 的参数对象
 * @param {ToolContext} context - 使用 ADK 提供的 ToolContext
 */
function get_restaurants(params, context) {
    const { cuisine, location, count = 5 } = params;
    console.info(`--- TOOL CALLED: get_restaurants (count: ${count}) ---`);
    console.info(`  - Cuisine: ${cuisine}`);
    console.info(`  - Location: ${location}`);

    let items = [];
    if (location.toLowerCase().includes('new york') || location.toLowerCase().includes('ny')) {
        try {
            const script_dir = path.dirname(__filename);
            const file_path = path.join(script_dir, 'restaurant_data.json');
            
            // Read the restaurant data file
            let restaurant_data_str = fs.readFileSync(file_path, 'utf8');
            
            // // Update base URL if provided in tool context
            // if (tool_context.state && tool_context.state.base_url) {
            //     const base_url = tool_context.state.base_url;
            //     restaurant_data_str = restaurant_data_str.replace(/http:\/\/localhost:10002/g, base_url);
            //     console.info(`Updated base URL from tool context: ${base_url}`);
            // }
            // 从 ToolContext 的 state 中获取 base_url
            // 兼容 Map.get() 或 对象属性 访问方式
            const baseUrl = typeof context.state.get === 'function' 
                ? context.state.get("base_url") 
                : context.state.base_url;
            
            // 替换 JSON 字符串中的 base_url
            if (baseUrl) {
                restaurant_data_str = restaurant_data_str.replace(/http:\/\/localhost:10002/g, baseUrl);
                console.info(`Updated base URL from ToolContext state: ${baseUrl}`);
            }
            
            const all_items = JSON.parse(restaurant_data_str);

            // Slice the list to return only the requested number of items
            items = all_items.slice(0, count);
            console.info(
                `  - Success: Found ${all_items.length} restaurants, returning ${items.length}.`
            );

        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`  - Error: restaurant_data.json not found at ${file_path}`);
            } else if (error instanceof SyntaxError) {
                console.error(`  - Error: Failed to parse JSON from ${file_path}`);
            } else {
                console.error(`  - Error: ${error.message}`);
            }
        }
    }

    return JSON.stringify(items);
}

// Wrap the get_restaurants function with FunctionTool for ADK
// exports.get_restaurants = get_restaurants;

// Create a wrapper function with correct signature for ADK
const getRestaurantsTool = new FunctionTool({
    name: "get_restaurants",
    description: "Call this tool to get a list of restaurants based on a cuisine and location. 'count' is the number of restaurants to return.",
    parameters: z.object({
        cuisine: z.string().describe("The type of cuisine to search for."),
        location: z.string().describe("The city or location for the restaurant search."),
        count: z.number().optional().default(5).describe("Number of restaurant results to return."),
    }),
    execute: get_restaurants,
});

module.exports = {
    getRestaurantsTool
};