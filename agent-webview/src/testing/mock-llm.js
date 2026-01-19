/**
 * Mock LLM Provider - 浏览器测试用模拟 LLM 响应
 * 无需真实 API Key 即可测试 Agent 流程
 */

// 模拟餐厅数据
export const MOCK_RESTAURANTS = [
    {
        name: "Golden Dragon Chinese Restaurant",
        cuisine: "Chinese",
        address: "123 Main Street, San Francisco, CA 94102",
        rating: 4.5,
        priceRange: "$$",
        imageUrl: "/static/golden-dragon.jpg",
        description: "Authentic Cantonese cuisine with a modern twist"
    },
    {
        name: "Szechuan Palace",
        cuisine: "Chinese (Szechuan)",
        address: "456 Market St, San Francisco, CA 94103",
        rating: 4.3,
        priceRange: "$$$",
        imageUrl: "/static/szechuan-palace.jpg",
        description: "Famous for spicy Szechuan dishes"
    },
    {
        name: "Dim Sum Garden",
        cuisine: "Chinese (Dim Sum)",
        address: "789 Grant Ave, San Francisco, CA 94108",
        rating: 4.7,
        priceRange: "$$",
        imageUrl: "/static/dim-sum-garden.jpg",
        description: "Best dim sum in Chinatown"
    },
    {
        name: "Bamboo House",
        cuisine: "Chinese (Hunan)",
        address: "321 Kearny St, San Francisco, CA 94108",
        rating: 4.2,
        priceRange: "$",
        imageUrl: "/static/bamboo-house.jpg",
        description: "Family-style Hunan cooking"
    },
    {
        name: "Dragon Pearl",
        cuisine: "Chinese (Seafood)",
        address: "555 Broadway, San Francisco, CA 94133",
        rating: 4.6,
        priceRange: "$$$",
        imageUrl: "/static/dragon-pearl.jpg",
        description: "Fresh seafood with Hong Kong style"
    }
];

// 模拟 A2UI 响应模板
const MOCK_A2UI_RESTAURANT_LIST = (restaurants) => ({
    type: "vertical_list",
    title: "Top Chinese Restaurants",
    items: restaurants.map((r, i) => ({
        type: "restaurant_card",
        id: `restaurant-${i}`,
        name: r.name,
        cuisine: r.cuisine,
        address: r.address,
        rating: r.rating,
        priceRange: r.priceRange,
        imageUrl: r.imageUrl,
        description: r.description,
        actions: [
            {
                type: "button",
                label: "Book Now",
                actionName: "book_restaurant",
                context: {
                    restaurantName: r.name,
                    address: r.address,
                    imageUrl: r.imageUrl
                }
            }
        ]
    }))
});

const MOCK_A2UI_BOOKING_FORM = (restaurantName, address, imageUrl) => ({
    type: "form",
    title: `Book ${restaurantName}`,
    fields: [
        {
            type: "number",
            name: "partySize",
            label: "Party Size",
            min: 1,
            max: 20,
            defaultValue: 2
        },
        {
            type: "datetime",
            name: "reservationTime",
            label: "Reservation Time"
        },
        {
            type: "text",
            name: "dietary",
            label: "Dietary Requirements",
            placeholder: "Any allergies or dietary restrictions?"
        }
    ],
    submitAction: {
        type: "submit",
        label: "Confirm Booking",
        actionName: "submit_booking",
        context: {
            restaurantName,
            address,
            imageUrl
        }
    }
});

const MOCK_A2UI_BOOKING_CONFIRMATION = (details) => ({
    type: "confirmation",
    title: "Booking Confirmed!",
    message: `Your reservation at ${details.restaurantName} has been confirmed.`,
    details: [
        { label: "Restaurant", value: details.restaurantName },
        { label: "Party Size", value: `${details.partySize} people` },
        { label: "Time", value: details.reservationTime },
        { label: "Dietary", value: details.dietary || "None" }
    ],
    confirmationNumber: `BK${Date.now().toString(36).toUpperCase()}`
});

/**
 * MockLLMProvider - 模拟 LLM 响应
 */
export class MockLLMProvider {
    constructor(options = {}) {
        this.delay = options.delay || 500;  // 模拟网络延迟
        this.useUI = options.useUI !== false;
        this.streamChunks = options.streamChunks || 3;
    }

    /**
     * 模拟流式响应生成器
     * @param {string} query - 用户查询
     * @param {string} contextId - 上下文 ID
     */
    async *stream(query, contextId) {
        console.info(`[MockLLM] Processing query: "${query.substring(0, 50)}..."`);
        
        // 模拟处理中状态
        for (let i = 1; i <= this.streamChunks; i++) {
            await this._sleep(this.delay);
            yield {
                is_task_complete: false,
                updates: `Processing... (${i}/${this.streamChunks})`
            };
        }

        // 根据查询类型生成响应
        const response = await this._generateResponse(query);
        
        await this._sleep(this.delay);
        yield {
            is_task_complete: true,
            content: response
        };
    }

    /**
     * 根据查询类型生成响应
     */
    async _generateResponse(query) {
        const queryLower = query.toLowerCase();
        
        // 处理预订请求
        if (query.startsWith('USER_WANTS_TO_BOOK:')) {
            const match = query.match(/USER_WANTS_TO_BOOK:\s*(.+?),\s*Address:\s*(.+?),\s*ImageURL:\s*(.+)/);
            if (match) {
                const [, name, address, imageUrl] = match;
                const textPart = `Great choice! Here's the booking form for ${name}:`;
                const uiPart = JSON.stringify(MOCK_A2UI_BOOKING_FORM(name.trim(), address.trim(), imageUrl.trim()));
                
                if (this.useUI) {
                    return `${textPart}\n---a2ui_JSON---\n${uiPart}`;
                }
                return textPart;
            }
        }

        // 处理预订提交
        if (queryLower.includes('submitted a booking for')) {
            const details = this._parseBookingDetails(query);
            const textPart = `Your booking has been confirmed!`;
            const uiPart = JSON.stringify(MOCK_A2UI_BOOKING_CONFIRMATION(details));
            
            if (this.useUI) {
                return `${textPart}\n---a2ui_JSON---\n${uiPart}`;
            }
            return `${textPart}\n\nRestaurant: ${details.restaurantName}\nParty Size: ${details.partySize}\nTime: ${details.reservationTime}`;
        }

        // 处理餐厅搜索
        if (queryLower.includes('chinese') || queryLower.includes('restaurant') || queryLower.includes('find')) {
            const textPart = `I found some great Chinese restaurants for you:`;
            const uiPart = JSON.stringify(MOCK_A2UI_RESTAURANT_LIST(MOCK_RESTAURANTS));
            
            if (this.useUI) {
                return `${textPart}\n---a2ui_JSON---\n${uiPart}`;
            }
            return `${textPart}\n\n${MOCK_RESTAURANTS.map((r, i) => 
                `${i+1}. ${r.name} - ${r.cuisine} (${r.rating}★)\n   ${r.address}`
            ).join('\n\n')}`;
        }

        // 默认响应
        return "I'm the Restaurant Agent. I can help you find and book restaurants. Try asking me to find Chinese restaurants!";
    }

    /**
     * 解析预订详情
     */
    _parseBookingDetails(query) {
        const details = {
            restaurantName: 'Unknown Restaurant',
            partySize: '2',
            reservationTime: 'Not specified',
            dietary: 'None'
        };

        const nameMatch = query.match(/booking for (.+?) for/);
        if (nameMatch) details.restaurantName = nameMatch[1];

        const sizeMatch = query.match(/for (\d+) people/);
        if (sizeMatch) details.partySize = sizeMatch[1];

        const timeMatch = query.match(/at (.+?) with/);
        if (timeMatch) details.reservationTime = timeMatch[1];

        const dietaryMatch = query.match(/requirements: (.+?)\.?$/);
        if (dietaryMatch) details.dietary = dietaryMatch[1];

        return details;
    }

    /**
     * 延迟工具
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * 创建 Mock Agent（用于测试）
 */
export function createMockAgent(baseUrl = '', useUI = true) {
    return {
        baseUrl,
        useUI,
        provider: new MockLLMProvider({ useUI }),
        
        async *stream(query, contextId) {
            yield* this.provider.stream(query, contextId);
        }
    };
}

export default {
    MockLLMProvider,
    createMockAgent,
    MOCK_RESTAURANTS
};
