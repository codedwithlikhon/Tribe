import { z } from 'zod';

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
});

export type AssistantAction = z.infer<typeof assistantActionSchema>;
export type AssistantResponse = z.infer<typeof assistantResponseSchema>;

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
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
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
