import type { A2UIExtension, RequestContext, UIEventAction } from './types.js';

const A2UI_EXTENSION_URI = 'tag:copilotkit.ai,2025:a2ui';

/**
 * Get the A2UI agent extension definition
 */
export function getA2UIAgentExtension(): A2UIExtension {
  return {
    uri: A2UI_EXTENSION_URI,
    description: 'Agent-to-UI extension for rich UI responses',
    requiredInputFields: [],
    optionalInputFields: [],
    outputFields: [],
  };
}

/**
 * Try to activate the A2UI extension based on request context
 * @returns true if A2UI extension should be used
 */
export function tryActivateA2UIExtension(context: RequestContext): boolean {
  const extensions = context.requested_extensions || [];
  return extensions.some(ext => ext.includes('a2ui') || ext.includes(A2UI_EXTENSION_URI));
}

/**
 * Create an A2UI data part from a message object
 */
export function createA2UIPart(message: Record<string, unknown>): { type: 'data'; data: Record<string, unknown> } {
  return {
    type: 'data',
    data: { a2ui: message }
  };
}

/**
 * Parse UI event from message parts
 */
export function parseUIEvent(parts: Array<{ type: string; data?: Record<string, unknown> }>): UIEventAction | null {
  for (const part of parts) {
    if (part.type === 'data' && part.data && 'userAction' in part.data) {
      return part.data.userAction as UIEventAction;
    }
  }
  return null;
}

/**
 * Build query from UI event action
 */
export function buildQueryFromUIEvent(action: UIEventAction): string {
  const actionName = action.actionName;
  const ctx = action.context || {};

  switch (actionName) {
    case 'book_restaurant': {
      const restaurantName = ctx.restaurantName || 'Unknown Restaurant';
      const address = ctx.address || 'Address not provided';
      const imageUrl = ctx.imageUrl || '';
      return `USER_WANTS_TO_BOOK: ${restaurantName}, Address: ${address}, ImageURL: ${imageUrl}`;
    }

    case 'submit_booking': {
      const restaurantName = ctx.restaurantName || 'Unknown Restaurant';
      const partySize = ctx.partySize || 'Unknown Size';
      const reservationTime = ctx.reservationTime || 'Unknown Time';
      const dietaryReqs = ctx.dietary || 'None';
      const imageUrl = ctx.imageUrl || '';
      return `User submitted a booking for ${restaurantName} for ${partySize} people at ${reservationTime} with dietary requirements: ${dietaryReqs}. The image URL is ${imageUrl}`;
    }

    default:
      return `User submitted an event: ${actionName} with data: ${JSON.stringify(ctx)}`;
  }
}
