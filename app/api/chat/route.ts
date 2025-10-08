import { z } from 'zod';
import { createModelFactory } from '../../../server/lib/modelFactory';
import { chatRequestSchema } from '../../../server/types';
import {
  generateAssistantResponse,
  ModelResponseValidationError,
} from '../../../server/lib/chat';

const { modelFactory, warnings } = createModelFactory();
warnings.forEach((warning) => console.warn(warning));

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set('content-type', 'application/json');
  return new Response(JSON.stringify(body), { ...init, headers });
}

export async function POST(request: Request): Promise<Response> {
  if (!modelFactory) {
    return jsonResponse({ error: 'AI provider not configured.' }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const parseResult = chatRequestSchema.safeParse(payload);
  if (!parseResult.success) {
    return jsonResponse({ error: 'Invalid payload', details: parseResult.error.flatten() }, { status: 400 });
  }

  const requestPayload = parseResult.data;
  const model = modelFactory();

  try {
    const assistantResponse = await generateAssistantResponse(model, requestPayload);
    return jsonResponse(assistantResponse);
  } catch (error) {
    console.error('AI request failed', error);
    if (error instanceof ModelResponseValidationError) {
      return jsonResponse(
        { error: 'Invalid model response structure', details: error.cause.flatten() },
        { status: 500 }
      );
    }

    if (error instanceof z.ZodError) {
      return jsonResponse({ error: 'Schema validation error', details: error.flatten() }, { status: 500 });
    }

    return jsonResponse({ error: 'Failed to generate response' }, { status: 500 });
  }
}

export function GET(): Response {
  return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
}
