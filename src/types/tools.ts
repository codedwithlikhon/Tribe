import { z } from 'zod';

export const toolKinds = ['fs', 'shell', 'npm', 'planning', 'workspace', 'terminal'] as const;
export type ToolKind = (typeof toolKinds)[number];

export const toolExecutionStatus = ['idle', 'running', 'succeeded', 'failed'] as const;
export type ToolExecutionStatus = (typeof toolExecutionStatus)[number];

export interface ToolDefinition<TInput extends z.ZodTypeAny, TResult extends z.ZodTypeAny> {
  name: string;
  description: string;
  kind: ToolKind;
  parameters: TInput;
  result: TResult;
  timeoutMs?: number;
  maxAttempts?: number;
}

export interface ToolRegistryEntry<TInput extends z.ZodTypeAny, TResult extends z.ZodTypeAny>
  extends ToolDefinition<TInput, TResult> {
  version: string;
  enabled: boolean;
}

export const toolInvocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  args: z.unknown(),
  attempt: z.number().int().min(1),
});

export type ToolInvocation = z.infer<typeof toolInvocationSchema>;

export const toolResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(toolExecutionStatus),
  output: z.unknown().optional(),
  error: z.string().optional(),
  startedAt: z.number().int(),
  completedAt: z.number().int().optional(),
});

export type ToolResult = z.infer<typeof toolResultSchema>;

export interface BroadcastChannelMessage<TPayload> {
  channel: string;
  requestId: string;
  payload: TPayload;
}

export interface ToolBridgeRequest {
  invocation: ToolInvocation;
  createdAt: number;
}

export interface ToolBridgeResponse {
  result: ToolResult;
  rawOutput?: string;
}

export interface ToolRetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  factor: number;
}

export const defaultToolRetryConfig: ToolRetryConfig = {
  maxAttempts: 3,
  baseDelayMs: 250,
  maxDelayMs: 2000,
  factor: 2,
};

export type ToolExecutionRecord = {
  invocation: ToolInvocation;
  status: ToolExecutionStatus;
  attempts: number;
  lastError?: string;
  lastAttemptAt?: number;
};

export function getNextRetryDelay(attempt: number, config: ToolRetryConfig = defaultToolRetryConfig): number {
  const delay = config.baseDelayMs * Math.pow(config.factor, attempt - 1);
  return Math.min(delay, config.maxDelayMs);
}

export type ToolExecutor<TInput extends z.ZodTypeAny, TResult extends z.ZodTypeAny> = (
  input: z.infer<TInput>,
) => Promise<z.infer<TResult>>;
