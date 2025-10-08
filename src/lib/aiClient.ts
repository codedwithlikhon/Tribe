import { ChatRequestPayload, AiActionResponse } from './types';

/**
 * Sends a chat payload to the backend API and returns the AI action response.
 */
export async function requestAiActions(payload: ChatRequestPayload): Promise<AiActionResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI request failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as AiActionResponse;
  return data;
}
