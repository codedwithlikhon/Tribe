import { z } from 'zod';

export const agentModes = ['fast', 'balanced', 'deep'] as const;
export type AgentMode = (typeof agentModes)[number];

export const thinkingBudgets = {
  fast: 0,
  balanced: 2048,
  deep: 8192,
} as const satisfies Record<AgentMode, number>;

export const geminiModels = {
  fast: 'gemini-2.0-flash',
  balanced: 'gemini-2.0-flash-thinking-exp',
  deep: 'gemini-2.5-pro-exp',
} as const satisfies Record<AgentMode, string>;

export interface AgentMetadata {
  id: string;
  label: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface ModelConfig {
  provider: 'gemini';
  model: string;
  maxOutputTokens: number;
  thinkingBudget: number;
  temperature: number;
}

export interface AgentRuntimeConfig {
  maxToolIterations: number;
  enablePlanning: boolean;
  allowParallelTools: boolean;
  maxParallelTools: number;
}

export interface AgentConfiguration {
  mode: AgentMode;
  metadata: AgentMetadata;
  systemPrompt: string;
  model: ModelConfig;
  runtime: AgentRuntimeConfig;
}

export const agentConfigurationSchema = z.object({
  mode: z.enum(agentModes),
  metadata: z.object({
    id: z.string(),
    label: z.string(),
    description: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
  }),
  systemPrompt: z.string(),
  model: z.object({
    provider: z.literal('gemini'),
    model: z.string(),
    maxOutputTokens: z.number().int().positive(),
    thinkingBudget: z.number().int().min(0),
    temperature: z.number().min(0).max(2),
  }),
  runtime: z.object({
    maxToolIterations: z.number().int().positive(),
    enablePlanning: z.boolean(),
    allowParallelTools: z.boolean(),
    maxParallelTools: z.number().int().positive(),
  }),
});

export type AgentConfigurationInput = z.input<typeof agentConfigurationSchema>;

export function createAgentConfiguration(
  mode: AgentMode,
  overrides: Partial<Omit<AgentConfiguration, 'mode'>> = {},
): AgentConfiguration {
  const now = Date.now();
  const defaults: AgentConfiguration = {
    mode,
    metadata: {
      id: `agent-${mode}`,
      label: mode === 'fast' ? 'Fast' : mode === 'balanced' ? 'Balanced' : 'Deep',
      description:
        mode === 'fast'
          ? 'Rapid responses with minimal reasoning tokens.'
          : mode === 'balanced'
            ? 'Balanced depth with moderate reasoning budget.'
            : 'Deep reasoning with the highest thinking budget.',
      createdAt: now,
      updatedAt: now,
    },
    systemPrompt: '',
    model: {
      provider: 'gemini',
      model: geminiModels[mode],
      maxOutputTokens: mode === 'deep' ? 4096 : 2048,
      thinkingBudget: thinkingBudgets[mode],
      temperature: mode === 'fast' ? 0.6 : mode === 'balanced' ? 0.8 : 0.9,
    },
    runtime: {
      maxToolIterations: mode === 'deep' ? 12 : mode === 'balanced' ? 8 : 4,
      enablePlanning: mode !== 'fast',
      allowParallelTools: mode !== 'deep',
      maxParallelTools: mode === 'fast' ? 3 : mode === 'balanced' ? 2 : 1,
    },
  };

  const merged: AgentConfiguration = {
    ...defaults,
    ...overrides,
    metadata: { ...defaults.metadata, ...overrides.metadata },
    model: { ...defaults.model, ...overrides.model },
    runtime: { ...defaults.runtime, ...overrides.runtime },
  };

  const parsed = agentConfigurationSchema.parse(merged);
  return parsed;
}

export interface WorkspaceContext {
  id: string;
  name: string;
  summary: string;
  activeFilePath?: string;
  repositoryUrl?: string;
  pendingOperations: number;
}

export function buildSystemPrompt(
  mode: AgentMode,
  context: WorkspaceContext,
  additionalDirectives: string[] = [],
): string {
  const baseDirectives: string[] = [
    'You are a coding agent operating inside a browser-based WebContainer.',
    'Always follow WCAG 2.1 AA accessibility standards.',
    'Prefer secure defaults and sanitize all user-controlled inputs.',
    `Current workspace summary: ${context.summary}`,
  ];

  if (context.activeFilePath) {
    baseDirectives.push(`Active file: ${context.activeFilePath}`);
  }

  if (context.repositoryUrl) {
    baseDirectives.push(`Repository: ${context.repositoryUrl}`);
  }

  if (context.pendingOperations > 0) {
    baseDirectives.push(
      `There are ${context.pendingOperations} pending workspace operations. Account for potential conflicts before editing files.`,
    );
  }

  const reasoningDirective =
    mode === 'fast'
      ? 'Use minimal reasoning tokens. Prioritize actionable answers.'
      : mode === 'balanced'
        ? 'Balance reasoning depth with responsiveness. Use planning when helpful.'
        : 'Use deep reasoning and planning to craft thorough solutions.';

  baseDirectives.push(reasoningDirective);

  return [...baseDirectives, ...additionalDirectives].join('\n');
}
