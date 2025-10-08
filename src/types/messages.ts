import { z } from 'zod';
import { ToolInvocation, toolInvocationSchema, ToolResult, toolResultSchema } from './tools';

export const agentRoles = ['system', 'user', 'assistant', 'tool'] as const;
export type AgentRole = (typeof agentRoles)[number];

export interface BaseMessage {
  id: string;
  role: AgentRole;
  createdAt: number;
}

export interface TextContent {
  type: 'text';
  text: string;
}

export interface ErrorContent {
  type: 'error';
  message: string;
}

export interface ReasoningTraceContent {
  type: 'reasoning-trace';
  steps: string[];
}

export type AssistantContent = TextContent | ErrorContent | ReasoningTraceContent;

export interface AssistantMessage extends BaseMessage {
  role: 'assistant';
  content: AssistantContent[];
  toolCalls?: ToolInvocation[];
  metadata?: Record<string, string | number | boolean>;
}

export interface UserMessage extends BaseMessage {
  role: 'user';
  content: TextContent[];
  mode: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SystemMessage extends BaseMessage {
  role: 'system';
  content: TextContent[];
}

export interface ToolMessage extends BaseMessage {
  role: 'tool';
  content: TextContent[];
  toolResult: ToolResult;
}

export type AgentMessage = AssistantMessage | UserMessage | SystemMessage | ToolMessage;

export const textContentSchema: z.ZodType<TextContent> = z.object({
  type: z.literal('text'),
  text: z.string(),
});

export const errorContentSchema: z.ZodType<ErrorContent> = z.object({
  type: z.literal('error'),
  message: z.string(),
});

export const reasoningTraceContentSchema: z.ZodType<ReasoningTraceContent> = z.object({
  type: z.literal('reasoning-trace'),
  steps: z.array(z.string()),
});

export const assistantContentSchema: z.ZodType<AssistantContent> = z.union([
  textContentSchema,
  errorContentSchema,
  reasoningTraceContentSchema,
]);

export const baseMessageSchema: z.ZodType<BaseMessage> = z.object({
  id: z.string(),
  role: z.enum(agentRoles),
  createdAt: z.number().int(),
});

export const assistantMessageSchema: z.ZodType<AssistantMessage> = baseMessageSchema.extend({
  role: z.literal('assistant'),
  content: z.array(assistantContentSchema),
  toolCalls: z.array(toolInvocationSchema).optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const userMessageSchema: z.ZodType<UserMessage> = baseMessageSchema.extend({
  role: z.literal('user'),
  content: z.array(textContentSchema),
  mode: z.string(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const systemMessageSchema: z.ZodType<SystemMessage> = baseMessageSchema.extend({
  role: z.literal('system'),
  content: z.array(textContentSchema),
});

export const toolMessageSchema: z.ZodType<ToolMessage> = baseMessageSchema.extend({
  role: z.literal('tool'),
  content: z.array(textContentSchema),
  toolResult: toolResultSchema,
});

export const agentMessageSchema: z.ZodType<AgentMessage> = z.discriminatedUnion('role', [
  assistantMessageSchema,
  userMessageSchema,
  systemMessageSchema,
  toolMessageSchema,
]);

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
  createdAt: z.number().int().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});
