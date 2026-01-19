/**
 * 餐厅数据 - 内联版本（替代 fs.readFileSync）
 * 在 WebView 环境中，无法使用 Node.js 的文件系统
 */

// 基础 URL 占位符，运行时会被替换
const BASE_URL_PLACEHOLDER = 'http://localhost:10002';

export const restaurantData = [
    {
        "name": "Xi'an Famous Foods",
        "detail": "Spicy and savory hand-pulled noodles.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/shrimpchowmein.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://www.xianfoods.com/)",
        "address": "81 St Marks Pl, New York, NY 10003"
    },
    {
        "name": "Han Dynasty",
        "detail": "Authentic Szechuan cuisine.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/mapotofu.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://www.handynasty.net/)",
        "address": "90 3rd Ave, New York, NY 10003"
    },
    {
        "name": "RedFarm",
        "detail": "Modern Chinese with a farm-to-table approach.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/beefbroccoli.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://www.redfarmnyc.com/)",
        "address": "529 Hudson St, New York, NY 10014"
    },
    {
        "name": "Mott 32",
        "detail": "Upscale Cantonese dining.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/springrolls.jpeg`,
        "rating": "★★★★★",
        "infoLink": "[More Info](https://mott32.com/newyork/)",
        "address": "111 W 57th St, New York, NY 10019"
    },
    {
        "name": "Hwa Yuan Szechuan",
        "detail": "Famous for its cold noodles with sesame sauce.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/kungpao.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://hwayuannyc.com/)",
        "address": "40 E Broadway, New York, NY 10002"
    },
    {
        "name": "Cafe China",
        "detail": "Szechuan food in a 1930s Shanghai setting.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/mapotofu.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://www.cafechinanyc.com/)",
        "address": "59 W 37th St, New York, NY 10018"
    },
    {
        "name": "Philippe Chow",
        "detail": "High-end Beijing-style cuisine.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/beefbroccoli.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://www.philippechow.com/)",
        "address": "33 E 60th St, New York, NY 10022"
    },
    {
        "name": "Chinese Tuxedo",
        "detail": "Contemporary Chinese in a former opera house.",
        "imageUrl": `${BASE_URL_PLACEHOLDER}/static/mapotofu.jpeg`,
        "rating": "★★★★☆",
        "infoLink": "[More Info](https://chinesetuxedo.com/)",
        "address": "5 Doyers St, New York, NY 10013"
    }
];

/**
 * 获取餐厅数据，并替换 baseUrl
 * @param {string} baseUrl - 新的基础 URL
 * @returns {Array} 餐厅数据数组
 */
export function getRestaurantDataWithBaseUrl(baseUrl) {
    if (!baseUrl || baseUrl === BASE_URL_PLACEHOLDER) {
        return restaurantData;
    }
    
    return restaurantData.map(restaurant => ({
        ...restaurant,
        imageUrl: restaurant.imageUrl.replace(BASE_URL_PLACEHOLDER, baseUrl)
    }));
}

export default restaurantData;
