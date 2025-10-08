import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { z } from 'zod';
import { chatRequestSchema } from './types';
import { createModelFactory } from './lib/modelFactory';
import {
  generateAssistantResponse,
  ModelResponseValidationError,
} from './lib/chat';

const PORT = Number(process.env.PORT ?? 8787);

const { modelFactory, providerName, warnings } = createModelFactory();
warnings.forEach((warning) => console.warn(warning));

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

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
    const assistantResponse = await generateAssistantResponse(model, requestPayload);
    return res.json(assistantResponse);
  } catch (error) {
    console.error('AI request failed', error);
    if (error instanceof ModelResponseValidationError) {
      return res.status(500).json({ error: 'Invalid model response structure', details: error.cause.flatten() });
    }

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
