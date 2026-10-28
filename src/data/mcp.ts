// src/data/mcp.ts
import mcpData from './mcp.json';

export interface McpParameter {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  desc?: string;
}

export interface McpTool {
  name: string;
  args: string;
  doc: string;
  summary: string;
  parameters: McpParameter[];
}

export interface McpResource {
  uri: string;
  functionName: string;
  doc: string;
  summary: string;
}

export interface McpPrompt {
  name: string;
  args: string;
  doc: string;
  summary: string;
}

export interface McpEnvVar {
  name: string;
  defaultVal: string;
  meaning: string;
}

export interface McpCatalog {
  lastSynced: string;
  version: string;
  name: string;
  subscriptionRequired: string;
  planPriceMonthly: number;
  transports: string[];
  defaultPort: number;
  defaultHost: string;
  endpoint: {
    prod: string;
    dev: string;
    local: string;
  };
  stats: {
    totalTools: number;
    totalResources: number;
    totalPrompts: number;
  };
  tools: McpTool[];
  resources: McpResource[];
  prompts: McpPrompt[];
  envVars: McpEnvVar[];
}

export const mcpCatalog: McpCatalog = mcpData as McpCatalog;

export function getMcpTools(): McpTool[] {
  return mcpCatalog.tools;
}

export function getMcpResources(): McpResource[] {
  return mcpCatalog.resources;
}

export function getMcpPrompts(): McpPrompt[] {
  return mcpCatalog.prompts;
}

export function getMcpStats() {
  return mcpCatalog.stats;
}

export function getMcpEnvVars(): McpEnvVar[] {
  return mcpCatalog.envVars;
}
