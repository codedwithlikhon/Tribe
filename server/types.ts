import { z } from 'zod';
import { chatMessageSchema as clientChatMessageSchema } from '../src/types/messages';
import {
  workspaceStateSchema,
  workspaceOperationSchema,
  workspaceSnapshotSchema,
  workspaceEntrySchema,
} from '../src/types/workspace';
import { toolInvocationSchema, toolResultSchema } from '../src/types/tools';

export const assistantActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('createOrUpdateFile'),
    path: z.string(),
    content: z.string(),
  }),
  z.object({
    type: z.literal('deletePath'),
    path: z.string(),
  }),
  z.object({
    type: z.literal('runCommand'),
    command: z.string(),
    cwd: z.string().optional(),
  }),
]);

export const assistantResponseSchema = z.object({
  reply: z.string(),
  actions: z.array(assistantActionSchema).default([]),
  toolCalls: z.array(toolInvocationSchema).optional(),
  toolResults: z.array(toolResultSchema).optional(),
});

export type AssistantAction = z.infer<typeof assistantActionSchema>;
export type AssistantResponse = z.infer<typeof assistantResponseSchema>;

export const chatMessageSchema = clientChatMessageSchema.pick({ role: true }).extend({
  content: z.string(),
});

export const fileSummarySchema = z.object({
  path: z.string(),
  size: z.number(),
  preview: z.string(),
  lastModified: z.number().optional(),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  projectSummary: z.object({
    files: z.array(fileSummarySchema),
    dependencies: z.array(z.string()),
  }),
  userMessage: z.string(),
  mode: z.string().optional(),
  workspaceState: workspaceStateSchema.optional(),
  recentOperations: z.array(workspaceOperationSchema).optional(),
  recentSnapshots: z.array(workspaceSnapshotSchema).optional(),
  entries: z.array(workspaceEntrySchema).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
