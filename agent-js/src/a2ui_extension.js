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
const A2UI_EXTENSION_URL = 'https://a2ui.org/a2a-extension/a2ui/v0.8';
/**
 * Tries to activate the A2UI extension based on the request context.
 * @param {import('@a2a-js/sdk/server').RequestContext} requestContext - The request context
 * @returns {boolean} Whether the A2UI extension should be activated
 */
function try_activate_a2ui_extension(requestContext) {
  // Check if A2UI extension is requested
  console.log(`----requestContext.context.requestedExtensions: ${requestContext.context.requestedExtensions}`)
  if (requestContext.context && requestContext.context.requestedExtensions) {
    return requestContext.context.requestedExtensions.includes(A2UI_EXTENSION_URL);
  }
  return false;
}

/**
 * Creates an A2UI data part from the given UI message.
 * @param {Object} uiMessage - The UI message data
 * @returns {{kind: string, data: Object}} The A2UI data part
 */
function create_a2ui_part(uiMessage) {
  return {
    kind: 'data',
    data: uiMessage
  };
}

module.exports = {
  try_activate_a2ui_extension,
  create_a2ui_part,
  A2UI_EXTENSION_URL
};
