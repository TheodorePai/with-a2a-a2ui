/**
 * 工具模块
 */

import { getRestaurantDataWithBaseUrl } from './restaurant-data.js';

/**
 * 获取餐厅列表
 * @param {Object} params - 参数对象
 * @param {string} params.cuisine - 美食类型
 * @param {string} params.location - 位置
 * @param {number} params.count - 返回数量
 * @param {Object} context - 上下文对象
 * @returns {string} JSON 字符串
 */
export function getRestaurants(params, context) {
    const { cuisine, location, count = 5 } = params;
    
    console.info(`--- TOOL CALLED: getRestaurants (count: ${count}) ---`);
    console.info(`  - Cuisine: ${cuisine}`);
    console.info(`  - Location: ${location}`);

    let items = [];
    
    // 检查位置是否为纽约
    if (location.toLowerCase().includes('new york') || location.toLowerCase().includes('ny')) {
        try {
            const baseUrl = context?.state?.base_url || context?.state?.baseUrl;
            const allItems = getRestaurantDataWithBaseUrl(baseUrl);
            items = allItems.slice(0, count);
            
            console.info(`  - Success: Found ${allItems.length} restaurants, returning ${items.length}.`);
        } catch (error) {
            console.error(`  - Error: ${error.message}`);
        }
    }

    return JSON.stringify(items);
}

/**
 * 工具定义（OpenAI 函数调用格式）
 */
export const toolDefinitions = [
    {
        type: "function",
        function: {
            name: "get_restaurants",
            description: "Call this tool to get a list of restaurants based on a cuisine and location. 'count' is the number of restaurants to return.",
            parameters: {
                type: "object",
                properties: {
                    cuisine: { 
                        type: "string", 
                        description: "The type of cuisine to search for." 
                    },
                    location: { 
                        type: "string", 
                        description: "The city or location for the restaurant search." 
                    },
                    count: { 
                        type: "number", 
                        description: "Number of restaurant results to return." 
                    }
                },
                required: ["cuisine", "location"]
            }
        }
    }
];

/**
 * 执行工具
 * @param {string} name - 工具名称
 * @param {Object} params - 工具参数
 * @param {Object} context - 上下文
 * @returns {string} 工具执行结果
 */
export function executeTool(name, params, context) {
    switch (name) {
        case 'get_restaurants':
            return getRestaurants(params, context);
        default:
            return JSON.stringify({ error: `Tool ${name} not found` });
    }
}
