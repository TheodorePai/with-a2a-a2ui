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

/**
 * Environment configuration
 * All environment variables should be accessed through this file
 */

const HOST:string = 'localhost';
const PORT:string = '10002';
const LOG_LEVEL:string = 'info';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = 'gemini-2.5-flash';
const OPENROUTER_APP_NAME = 'A2UI Restaurant Agent';
const OPENROUTER_REFERER = 'A2UI.org';

const OPENAI_API_KEY = '';
const OPENAI_BASE_URL = 'https://api.openai.com/v1';
const OPENAI_MODEL = '';

const GEMINI_API_KEY = '';
const LITELLM_MODEL = '';
const GOOGLE_GENAI_USE_VERTEXAI = 'FALSE';

// Server Configuration
export const SERVER_CONFIG = {
  host: HOST,
  port: parseInt(PORT, 10),
} as const;

// Logging Configuration

export const LOG_CONFIG = {
  level: (LOG_LEVEL).toLowerCase() as 'debug' | 'info' | 'warn' | 'error',
} as const;

// LLM Provider Configuration
export const LLM_CONFIG = {
  // OpenRouter
  openrouter: {
    apiKey: OPENROUTER_API_KEY,
    model: OPENROUTER_MODEL,
    appName: OPENROUTER_APP_NAME,
    referer: OPENROUTER_REFERER,
  },
  // OpenAI
  openai: {
    apiKey: OPENAI_API_KEY,
    baseUrl: OPENAI_BASE_URL,
    model: OPENAI_MODEL,
  },
  // Gemini
  gemini: {
    apiKey: GEMINI_API_KEY,
  },
  // LiteLLM (for backward compatibility)
  litellm: {
    model: LITELLM_MODEL,
  },
  // Vertex AI
  vertexAi: {
    enabled: GOOGLE_GENAI_USE_VERTEXAI.toUpperCase() === 'TRUE',
  },
} as const;

/**
 * Get the active LLM provider configuration
 * Priority: OpenRouter > OpenAI > Gemini
 */
export function getActiveLLMProvider() {
  if (LLM_CONFIG.openrouter.apiKey) {
    return {
      name: 'openrouter' as const,
      apiKey: LLM_CONFIG.openrouter.apiKey,
      baseUrl: 'https://openrouter.ai/api/v1',
      defaultModel: LLM_CONFIG.openrouter.model,
      headers: {
        'HTTP-Referer': LLM_CONFIG.openrouter.referer,
        'X-Title': LLM_CONFIG.openrouter.appName,
      },
    };
  }

  if (LLM_CONFIG.openai.apiKey) {
    return {
      name: 'openai' as const,
      apiKey: LLM_CONFIG.openai.apiKey,
      baseUrl: LLM_CONFIG.openai.baseUrl,
      defaultModel: 'gpt-4o',
      headers: undefined,
    };
  }

  if (LLM_CONFIG.gemini.apiKey) {
    return {
      name: 'gemini' as const,
      apiKey: LLM_CONFIG.gemini.apiKey,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      defaultModel: 'gemini-2.0-flash-exp',
      headers: undefined,
    };
  }

  return null;
}

/**
 * Get the model to use
 * Priority: explicit model config > default from active provider
 */
export function getModelName(): string {
  const activeProvider = getActiveLLMProvider();
  
  // Check for explicitly configured models
  if (LLM_CONFIG.openai.model) return LLM_CONFIG.openai.model;
  if (LLM_CONFIG.litellm.model) return LLM_CONFIG.litellm.model;
  if (LLM_CONFIG.openrouter.model) return LLM_CONFIG.openrouter.model;
  
  // Fall back to provider default
  return activeProvider?.defaultModel || 'gpt-4o';
}

/**
 * Check if any LLM provider is configured
 */
export function hasLLMProvider(): boolean {
  if (LLM_CONFIG.vertexAi.enabled) return true;
  return getActiveLLMProvider() !== null;
}

/**
 * Get error message for missing API key
 */
export function getLLMConfigErrorMessage(): string {
  return `No LLM API key found. Please set one of the following environment variables:
  - OPENROUTER_API_KEY (recommended - get from https://openrouter.ai/keys)
  - OPENAI_API_KEY
  - GEMINI_API_KEY
  - Or set GOOGLE_GENAI_USE_VERTEXAI=TRUE for Vertex AI`;
}
