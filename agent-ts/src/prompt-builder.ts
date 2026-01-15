// The A2UI schema for validation
export const A2UI_SCHEMA = {
  "title": "A2UI Message Schema",
  "description": "Describes a JSON payload for an A2UI (Agent to UI) message.",
  "type": "object",
  "properties": {
    "beginRendering": {
      "type": "object",
      "properties": {
        "surfaceId": { "type": "string" },
        "root": { "type": "string" },
        "styles": {
          "type": "object",
          "properties": {
            "font": { "type": "string" },
            "primaryColor": { "type": "string" }
          }
        }
      },
      "required": ["root", "surfaceId"]
    },
    "surfaceUpdate": {
      "type": "object",
      "properties": {
        "surfaceId": { "type": "string" },
        "components": {
          "type": "array",
          "minItems": 1,
          "items": { "type": "object" }
        }
      },
      "required": ["surfaceId", "components"]
    },
    "dataModelUpdate": {
      "type": "object",
      "properties": {
        "surfaceId": { "type": "string" },
        "path": { "type": "string" },
        "contents": {
          "type": "array",
          "items": { "type": "object" }
        }
      },
      "required": ["contents", "surfaceId"]
    },
    "deleteSurface": {
      "type": "object",
      "properties": {
        "surfaceId": { "type": "string" }
      },
      "required": ["surfaceId"]
    }
  }
};

export const RESTAURANT_UI_EXAMPLES = `
---BEGIN SINGLE_COLUMN_LIST_EXAMPLE---
[
  { "beginRendering": { "surfaceId": "default", "root": "root-column", "styles": { "primaryColor": "#FF0000", "font": "Roboto" } } },
  { "surfaceUpdate": {
    "surfaceId": "default",
    "components": [
      { "id": "root-column", "component": { "Column": { "children": { "explicitList": ["title-heading", "item-list"] } } } },
      { "id": "title-heading", "component": { "Text": { "usageHint": "h1", "text": { "literalString": "Top Restaurants" } } } },
      { "id": "item-list", "component": { "List": { "direction": "vertical", "children": { "template": { "componentId": "item-card-template", "dataBinding": "/items" } } } } },
      { "id": "item-card-template", "component": { "Card": { "child": "card-layout" } } },
      { "id": "card-layout", "component": { "Row": { "children": { "explicitList": ["template-image", "card-details"] } } } },
      { "id": "template-image", "weight": 1, "component": { "Image": { "url": { "path": "imageUrl" } } } },
      { "id": "card-details", "weight": 2, "component": { "Column": { "children": { "explicitList": ["template-name", "template-rating", "template-detail", "template-link", "template-book-button"] } } } },
      { "id": "template-name", "component": { "Text": { "usageHint": "h3", "text": { "path": "name" } } } },
      { "id": "template-rating", "component": { "Text": { "text": { "path": "rating" } } } },
      { "id": "template-detail", "component": { "Text": { "text": { "path": "detail" } } } },
      { "id": "template-link", "component": { "Text": { "text": { "path": "infoLink" } } } },
      { "id": "template-book-button", "component": { "Button": { "child": "book-now-text", "primary": true, "action": { "name": "book_restaurant", "context": [ { "key": "restaurantName", "value": { "path": "name" } }, { "key": "imageUrl", "value": { "path": "imageUrl" } }, { "key": "address", "value": { "path": "address" } } ] } } } },
      { "id": "book-now-text", "component": { "Text": { "text": { "literalString": "Book Now" } } } }
    ]
  } },
  { "dataModelUpdate": {
    "surfaceId": "default",
    "path": "/",
    "contents": [
      { "key": "items", "valueMap": [
        { "key": "item1", "valueMap": [
          { "key": "name", "valueString": "The Fancy Place" },
          { "key": "rating", "valueNumber": 4.8 },
          { "key": "detail", "valueString": "Fine dining experience" },
          { "key": "infoLink", "valueString": "https://example.com/fancy" },
          { "key": "imageUrl", "valueString": "https://example.com/fancy.jpg" },
          { "key": "address", "valueString": "123 Main St" }
        ] },
        { "key": "item2", "valueMap": [
          { "key": "name", "valueString": "Quick Bites" },
          { "key": "rating", "valueNumber": 4.2 },
          { "key": "detail", "valueString": "Casual and fast" },
          { "key": "infoLink", "valueString": "https://example.com/quick" },
          { "key": "imageUrl", "valueString": "https://example.com/quick.jpg" },
          { "key": "address", "valueString": "456 Oak Ave" }
        ] }
      ] }
    ]
  } }
]
---END SINGLE_COLUMN_LIST_EXAMPLE---

---BEGIN TWO_COLUMN_LIST_EXAMPLE---
[
  { "beginRendering": { "surfaceId": "default", "root": "root-column", "styles": { "primaryColor": "#FF0000", "font": "Roboto" } } },
  { "surfaceUpdate": {
    "surfaceId": "default",
    "components": [
      { "id": "root-column", "component": { "Column": { "children": { "explicitList": ["title-heading", "restaurant-row-1"] } } } },
      { "id": "title-heading", "component": { "Text": { "usageHint": "h1", "text": { "literalString": "Top Restaurants" } } } },
      { "id": "restaurant-row-1", "component": { "Row": { "children": { "explicitList": ["item-card-1", "item-card-2"] } } } },
      { "id": "item-card-1", "weight": 1, "component": { "Card": { "child": "card-layout-1" } } },
      { "id": "card-layout-1", "component": { "Column": { "children": { "explicitList": ["template-image-1", "card-details-1"] } } } },
      { "id": "template-image-1", "component": { "Image": { "url": { "path": "/items/0/imageUrl" }, "width": "100%" } } },
      { "id": "card-details-1", "component": { "Column": { "children": { "explicitList": ["template-name-1", "template-rating-1", "template-detail-1", "template-link-1", "template-book-button-1"] } } } },
      { "id": "template-name-1", "component": { "Text": { "usageHint": "h3", "text": { "path": "/items/0/name" } } } },
      { "id": "template-rating-1", "component": { "Text": { "text": { "path": "/items/0/rating" } } } },
      { "id": "template-detail-1", "component": { "Text": { "text": { "path": "/items/0/detail" } } } },
      { "id": "template-link-1", "component": { "Text": { "text": { "path": "/items/0/infoLink" } } } },
      { "id": "template-book-button-1", "component": { "Button": { "child": "book-now-text-1", "action": { "name": "book_restaurant", "context": [ { "key": "restaurantName", "value": { "path": "/items/0/name" } }, { "key": "imageUrl", "value": { "path": "/items/0/imageUrl" } }, { "key": "address", "value": { "path": "/items/0/address" } } ] } } } },
      { "id": "book-now-text-1", "component": { "Text": { "text": { "literalString": "Book Now" } } } },
      { "id": "item-card-2", "weight": 1, "component": { "Card": { "child": "card-layout-2" } } },
      { "id": "card-layout-2", "component": { "Column": { "children": { "explicitList": ["template-image-2", "card-details-2"] } } } },
      { "id": "template-image-2", "component": { "Image": { "url": { "path": "/items/1/imageUrl" }, "width": "100%" } } },
      { "id": "card-details-2", "component": { "Column": { "children": { "explicitList": ["template-name-2", "template-rating-2", "template-detail-2", "template-link-2", "template-book-button-2"] } } } },
      { "id": "template-name-2", "component": { "Text": { "usageHint": "h3", "text": { "path": "/items/1/name" } } } },
      { "id": "template-rating-2", "component": { "Text": { "text": { "path": "/items/1/rating" } } } },
      { "id": "template-detail-2", "component": { "Text": { "text": { "path": "/items/1/detail" } } } },
      { "id": "template-link-2", "component": { "Text": { "text": { "path": "/items/1/infoLink" } } } },
      { "id": "template-book-button-2", "component": { "Button": { "child": "book-now-text-2", "action": { "name": "book_restaurant", "context": [ { "key": "restaurantName", "value": { "path": "/items/1/name" } }, { "key": "imageUrl", "value": { "path": "/items/1/imageUrl" } }, { "key": "address", "value": { "path": "/items/1/address" } } ] } } } },
      { "id": "book-now-text-2", "component": { "Text": { "text": { "literalString": "Book Now" } } } }
    ]
  } },
  { "dataModelUpdate": {
    "surfaceId": "default",
    "path": "/",
    "contents": [
      { "key": "items", "valueMap": [
        { "key": "item1", "valueMap": [
          { "key": "name", "valueString": "The Fancy Place" },
          { "key": "rating", "valueNumber": 4.8 },
          { "key": "detail", "valueString": "Fine dining experience" },
          { "key": "infoLink", "valueString": "https://example.com/fancy" },
          { "key": "imageUrl", "valueString": "https://example.com/fancy.jpg" },
          { "key": "address", "valueString": "123 Main St" }
        ] },
        { "key": "item2", "valueMap": [
          { "key": "name", "valueString": "Quick Bites" },
          { "key": "rating", "valueNumber": 4.2 },
          { "key": "detail", "valueString": "Casual and fast" },
          { "key": "infoLink", "valueString": "https://example.com/quick" },
          { "key": "imageUrl", "valueString": "https://example.com/quick.jpg" },
          { "key": "address", "valueString": "456 Oak Ave" }
        ] }
      ] }
    ]
  } }
]
---END TWO_COLUMN_LIST_EXAMPLE---

---BEGIN BOOKING_FORM_EXAMPLE---
[
  { "beginRendering": { "surfaceId": "booking-form", "root": "booking-form-column", "styles": { "primaryColor": "#FF0000", "font": "Roboto" } } },
  { "surfaceUpdate": {
    "surfaceId": "booking-form",
    "components": [
      { "id": "booking-form-column", "component": { "Column": { "children": { "explicitList": ["booking-title", "restaurant-image", "restaurant-address", "party-size-field", "datetime-field", "dietary-field", "submit-button"] } } } },
      { "id": "booking-title", "component": { "Text": { "usageHint": "h2", "text": { "path": "title" } } } },
      { "id": "restaurant-image", "component": { "Image": { "url": { "path": "imageUrl" } } } },
      { "id": "restaurant-address", "component": { "Text": { "text": { "path": "address" } } } },
      { "id": "party-size-field", "component": { "TextField": { "label": { "literalString": "Party Size" }, "text": { "path": "partySize" }, "type": "number" } } },
      { "id": "datetime-field", "component": { "DateTimeInput": { "label": { "literalString": "Date & Time" }, "value": { "path": "reservationTime" }, "enableDate": true, "enableTime": true } } },
      { "id": "dietary-field", "component": { "TextField": { "label": { "literalString": "Dietary Requirements" }, "text": { "path": "dietary" } } } },
      { "id": "submit-button", "component": { "Button": { "child": "submit-reservation-text", "action": { "name": "submit_booking", "context": [ { "key": "restaurantName", "value": { "path": "restaurantName" } }, { "key": "partySize", "value": { "path": "partySize" } }, { "key": "reservationTime", "value": { "path": "reservationTime" } }, { "key": "dietary", "value": { "path": "dietary" } }, { "key": "imageUrl", "value": { "path": "imageUrl" } } ] } } } },
      { "id": "submit-reservation-text", "component": { "Text": { "text": { "literalString": "Submit Reservation" } } } }
    ]
  } },
  { "dataModelUpdate": {
    "surfaceId": "booking-form",
    "path": "/",
    "contents": [
      { "key": "title", "valueString": "Book a Table at [RestaurantName]" },
      { "key": "address", "valueString": "[Restaurant Address]" },
      { "key": "restaurantName", "valueString": "[RestaurantName]" },
      { "key": "partySize", "valueString": "2" },
      { "key": "reservationTime", "valueString": "" },
      { "key": "dietary", "valueString": "" },
      { "key": "imageUrl", "valueString": "" }
    ]
  } }
]
---END BOOKING_FORM_EXAMPLE---

---BEGIN CONFIRMATION_EXAMPLE---
[
  { "beginRendering": { "surfaceId": "confirmation", "root": "confirmation-card", "styles": { "primaryColor": "#FF0000", "font": "Roboto" } } },
  { "surfaceUpdate": {
    "surfaceId": "confirmation",
    "components": [
      { "id": "confirmation-card", "component": { "Card": { "child": "confirmation-column" } } },
      { "id": "confirmation-column", "component": { "Column": { "children": { "explicitList": ["confirm-title", "confirm-image", "divider1", "confirm-details", "divider2", "confirm-dietary", "divider3", "confirm-text"] } } } },
      { "id": "confirm-title", "component": { "Text": { "usageHint": "h2", "text": { "path": "title" } } } },
      { "id": "confirm-image", "component": { "Image": { "url": { "path": "imageUrl" } } } },
      { "id": "confirm-details", "component": { "Text": { "text": { "path": "bookingDetails" } } } },
      { "id": "confirm-dietary", "component": { "Text": { "text": { "path": "dietaryRequirements" } } } },
      { "id": "confirm-text", "component": { "Text": { "usageHint": "h5", "text": { "literalString": "We look forward to seeing you!" } } } },
      { "id": "divider1", "component": { "Divider": {} } },
      { "id": "divider2", "component": { "Divider": {} } },
      { "id": "divider3", "component": { "Divider": {} } }
    ]
  } },
  { "dataModelUpdate": {
    "surfaceId": "confirmation",
    "path": "/",
    "contents": [
      { "key": "title", "valueString": "Booking at [RestaurantName]" },
      { "key": "bookingDetails", "valueString": "[PartySize] people at [Time]" },
      { "key": "dietaryRequirements", "valueString": "Dietary Requirements: [Requirements]" },
      { "key": "imageUrl", "valueString": "[ImageUrl]" }
    ]
  } }
]
---END CONFIRMATION_EXAMPLE---
`;

export const AGENT_INSTRUCTION = `
    You are a helpful restaurant finding assistant. Your goal is to help users find and book restaurants using a rich UI.

    To achieve this, you MUST follow this logic:

    1.  **For finding restaurants:**
        a. You MUST call the \`get_restaurants\` tool. Extract the cuisine, location, and a specific number (\`count\`) of restaurants from the user's query (e.g., for "top 5 chinese places", count is 5).
        b. After receiving the data, you MUST follow the instructions precisely to generate the final a2ui UI JSON, using the appropriate UI example based on the number of restaurants.

    2.  **For booking a table (when you receive a query like 'USER_WANTS_TO_BOOK...'):**
        a. You MUST use the appropriate UI example to generate the UI, populating the \`dataModelUpdate.contents\` with the details from the user's query.

    3.  **For confirming a booking (when you receive a query like 'User submitted a booking...'):**
        a. You MUST use the appropriate UI example to generate the confirmation UI, populating the \`dataModelUpdate.contents\` with the final booking details.
`;

/**
 * Get the UI prompt with examples and schema
 */
export function getUIPrompt(baseUrl: string): string {
  const formattedExamples = RESTAURANT_UI_EXAMPLES.replace(
    /http:\/\/localhost:10002/g,
    baseUrl
  );

  return `
    You are a helpful restaurant finding assistant. Your final output MUST be a a2ui UI JSON response.

    To generate the response, you MUST follow these rules:
    1.  Your response MUST be in two parts, separated by the delimiter: \`---a2ui_JSON---\`.
    2.  The first part is your conversational text response.
    3.  The second part is a single, raw JSON object which is a list of A2UI messages.
    4.  The JSON part MUST validate against the A2UI JSON SCHEMA provided below.

    --- UI TEMPLATE RULES ---
    -   If the query is for a list of restaurants, use the restaurant data you have already received from the \`get_restaurants\` tool to populate the \`dataModelUpdate.contents\` array (e.g., as a \`valueMap\` for the "items" key).
    -   If the number of restaurants is 5 or fewer, you MUST use the \`SINGLE_COLUMN_LIST_EXAMPLE\` template.
    -   If the number of restaurants is more than 5, you MUST use the \`TWO_COLUMN_LIST_EXAMPLE\` template.
    -   If the query is to book a restaurant (e.g., "USER_WANTS_TO_BOOK..."), you MUST use the \`BOOKING_FORM_EXAMPLE\` template.
    -   If the query is a booking submission (e.g., "User submitted a booking..."), you MUST use the \`CONFIRMATION_EXAMPLE\` template.

    ${formattedExamples}

    ---BEGIN A2UI JSON SCHEMA---
    ${JSON.stringify(A2UI_SCHEMA, null, 2)}
    ---END A2UI JSON SCHEMA---
  `;
}

/**
 * Get the text-only prompt
 */
export function getTextPrompt(): string {
  return `
    You are a helpful restaurant finding assistant. Your final output MUST be a text response.

    To generate the response, you MUST follow these rules:
    1.  **For finding restaurants:**
        a. You MUST call the \`get_restaurants\` tool. Extract the cuisine, location, and a specific number (\`count\`) of restaurants from the user's query.
        b. After receiving the data, format the restaurant list as a clear, human-readable text response. You MUST preserve any markdown formatting (like for links) that you receive from the tool.

    2.  **For booking a table (when you receive a query like 'USER_WANTS_TO_BOOK...'):**
        a. Respond by asking the user for the necessary details to make a booking (party size, date, time, dietary requirements).

    3.  **For confirming a booking (when you receive a query like 'User submitted a booking...'):**
        a. Respond with a simple text confirmation of the booking details.
  `;
}
