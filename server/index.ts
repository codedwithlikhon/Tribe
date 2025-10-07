import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { generateObject } from 'ai';
import type { LanguageModel } from 'ai';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { assistantResponseSchema, chatRequestSchema, ChatRequest } from './types';

const PORT = Number(process.env.PORT ?? 8787);

type GeminiAuthType = 'oauth-personal' | 'api-key' | 'gemini-api-key';
type ProviderName = 'gemini' | 'groq';

const providerName = (process.env.AI_PROVIDER ?? 'gemini') as ProviderName;

const geminiAuthTypeEnv = process.env.GEMINI_AUTH_TYPE as GeminiAuthType | undefined;
const geminiApiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const geminiAuthType: GeminiAuthType = geminiAuthTypeEnv ?? (geminiApiKey ? 'api-key' : 'oauth-personal');
const missingGeminiApiKey = geminiAuthType !== 'oauth-personal' && !geminiApiKey;

const groqApiKey = process.env.GROQ_API_KEY;
const groqModelName = process.env.GROQ_MODEL ?? 'deepseek-r1-distill-llama-70b';

let modelFactory: (() => LanguageModel) | null = null;

if (providerName === 'groq') {
  if (!groqApiKey) {
    console.warn('Missing GROQ_API_KEY environment variable. Configure GROQ_API_KEY to enable Groq responses.');
  } else {
    const groqProvider = createGroq({ apiKey: groqApiKey });
    modelFactory = () => groqProvider(groqModelName) as unknown as LanguageModel;
  }
} else {
  if (missingGeminiApiKey) {
    console.warn(
      'Missing GEMINI_API_KEY environment variable. Configure GEMINI_API_KEY or switch GEMINI_AUTH_TYPE to "oauth-personal" to enable AI features.'
    );
  }

  const gemini = !missingGeminiApiKey
    ? createGeminiProvider(
        geminiAuthType === 'oauth-personal'
          ? { authType: 'oauth-personal' }
          : { authType: geminiAuthType, apiKey: geminiApiKey as string }
      )
    : null;

  const geminiModelName = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';

  if (gemini) {
    modelFactory = () => gemini(geminiModelName) as unknown as LanguageModel;
  }
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const baseSystemPrompt = `You are Tribe, an AI agent that orchestrates a WebContainer workspace.\n\nYou can respond with a structured JSON payload describing actions to perform: write files, delete paths, and run commands. The user has a full Node.js environment with npm available.\n\nGuidelines:\n- Prefer small, incremental changes.\n- Run \\"npm install\\" before using a dependency.\n- Use runCommand for commands (install, build, start).\n- Always provide a concise natural language explanation in \\"reply\\".\n- File paths are relative to the project root.\n- Never include secrets.\n- Validate inputs and keep code safe.`;

function buildContextSummary(request: ChatRequest): string {
  const dependencyList = request.projectSummary.dependencies.length
    ? request.projectSummary.dependencies.join(', ')
    : 'No dependencies installed yet.';

  const fileSummary = request.projectSummary.files
    .slice(0, 20)
    .map((file) => {
      const preview = file.preview.replace(/```/g, '');
      return `• ${file.path} (${file.size} chars)\n${preview}`;
    })
    .join('\n\n');

  return `Current dependencies: ${dependencyList}\n\nImportant files:\n${fileSummary || 'No project files yet.'}`;
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  if (!modelFactory) {
    return res.status(503).json({ error: 'AI provider not configured.' });
  }

  const parseResult = chatRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parseResult.error.flatten() });
  }

  const requestPayload = parseResult.data;
  const model = modelFactory();

  try {
    const { object } = await generateObject({
      model: model as unknown as LanguageModel,
      temperature: 0.2,
      schema: assistantResponseSchema,
      system: baseSystemPrompt,
      messages: requestPayload.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      prompt: `${buildContextSummary(requestPayload)}\n\nUser request:\n${requestPayload.userMessage}`,
    });

    const responseParse = assistantResponseSchema.safeParse(object);
    if (!responseParse.success) {
      return res.status(500).json({ error: 'Invalid model response structure', details: responseParse.error.flatten() });
    }

    return res.json(responseParse.data);
  } catch (error) {
    console.error('AI request failed', error);
    if (error instanceof z.ZodError) {
      return res.status(500).json({ error: 'Schema validation error', details: error.flatten() });
    }
    return res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  const statusLabel = modelFactory ? providerName : 'unconfigured';
  console.log(`API server listening on http://localhost:${PORT} (provider: ${statusLabel})`);
});
