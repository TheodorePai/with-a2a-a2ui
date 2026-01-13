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

export interface Restaurant {
  name: string;
  detail: string;
  imageUrl: string;
  rating: string;
  infoLink: string;
  address: string;
}

export interface ToolContext {
  state: Record<string, unknown>;
}

export interface A2UIExtension {
  uri: string;
  description: string;
  requiredInputFields?: string[];
  optionalInputFields?: string[];
  outputFields?: string[];
}

export interface AgentCapabilities {
  streaming: boolean;
  extensions?: A2UIExtension[];
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  tags: string[];
  examples: string[];
}

export interface AgentCard {
  name: string;
  description: string;
  url: string;
  version: string;
  default_input_modes: string[];
  default_output_modes: string[];
  capabilities: AgentCapabilities;
  skills: AgentSkill[];
}

export interface UIEventAction {
  actionName: string;
  context: Record<string, unknown>;
}

export interface RequestContext {
  message?: {
    parts: MessagePart[];
  };
  current_task?: Task | null;
  requested_extensions?: string[];
}

export interface MessagePart {
  type: 'text' | 'data';
  text?: string;
  data?: Record<string, unknown>;
}

export interface Task {
  id: string;
  context_id: string;
  state: TaskState | string;
}

export enum TaskState {
  WORKING = 'working',
  COMPLETED = 'completed',
  INPUT_REQUIRED = 'input_required',
}

export interface StreamResult {
  is_task_complete: boolean;
  content?: string;
  updates?: string;
}

export interface A2UIMessage {
  beginRendering?: {
    surfaceId: string;
    root: string;
    styles?: {
      primaryColor?: string;
      font?: string;
    };
  };
  surfaceUpdate?: {
    surfaceId: string;
    components: A2UIComponent[];
  };
  dataModelUpdate?: {
    surfaceId: string;
    path?: string;
    contents: A2UIDataEntry[];
  };
  deleteSurface?: {
    surfaceId: string;
  };
}

export interface A2UIComponent {
  id: string;
  weight?: number;
  component: Record<string, unknown>;
}

export interface A2UIDataEntry {
  key: string;
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
  valueMap?: A2UIDataEntry[];
}
