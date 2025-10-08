import type { LanguageModel } from 'ai';
import { convertToCoreMessages, generateObject } from 'ai';
import { z } from 'zod';
import {
  assistantResponseSchema,
  type AssistantResponse,
  type ChatRequest,
} from '../types';
import { baseSystemPrompt } from './.server/llm/prompts';
import { buildContextSummary } from './context';

export class ModelResponseValidationError extends Error {
  constructor(readonly cause: z.ZodError) {
    super('Model response did not match the expected schema.');
    this.name = 'ModelResponseValidationError';
  }
}

/**
 * Invokes the configured language model to produce a structured assistant response.
 */
export async function generateAssistantResponse(
  model: LanguageModel,
  request: ChatRequest
): Promise<AssistantResponse> {
  const { object } = await generateObject({
    model,
    temperature: 0.2,
    schema: assistantResponseSchema,
    system: baseSystemPrompt,
    messages: convertToCoreMessages(request.messages),
    prompt: `${buildContextSummary(request)}\n\nUser request:\n${request.userMessage}`,
  });

  const parseResult = assistantResponseSchema.safeParse(object);

  if (!parseResult.success) {
    throw new ModelResponseValidationError(parseResult.error);
  }

  return parseResult.data;
}
