import { AgentCard } from "@a2a-js/sdk";
import { baseUrl } from "./config";
import { RestaurantAgent } from "./agent";
import { getA2UIAgentExtension } from "./a2ui-extension";

// agent card definition
export const agentCard: AgentCard = {
name: 'Restaurant Agent',
description: 'This agent helps find restaurants based on user criteria.',
url: baseUrl,
version: '1.0.0',
defaultInputModes: RestaurantAgent.SUPPORTED_CONTENT_TYPES,
defaultOutputModes: RestaurantAgent.SUPPORTED_CONTENT_TYPES,
capabilities: {
    streaming: true,
    extensions: [getA2UIAgentExtension()],
},
skills: [
    {
    id: 'find_restaurants',
    name: 'Find Restaurants Tool',
    description: 'Helps find restaurants based on user criteria (e.g., cuisine, location).',
    tags: ['restaurant', 'finder'],
    examples: ['Find me the top 10 chinese restaurants in the US'],
    },
],
};