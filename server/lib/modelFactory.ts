import type { LanguageModel } from 'ai';
import { createCohere } from '@ai-sdk/cohere';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import { createGroq } from '@ai-sdk/groq';

export type GeminiAuthType = 'oauth-personal' | 'api-key' | 'gemini-api-key';
export type ProviderName = 'gemini' | 'groq' | 'cohere';

export interface ModelFactoryResult {
  modelFactory: (() => LanguageModel) | null;
  providerName: ProviderName;
  warnings: string[];
}

export function createModelFactory(): ModelFactoryResult {
  const providerNameEnv = process.env.AI_PROVIDER;
  const providerName: ProviderName =
    providerNameEnv === 'groq' || providerNameEnv === 'cohere' ? providerNameEnv : 'gemini';

  const warnings: string[] = [];
  let modelFactory: (() => LanguageModel) | null = null;

  if (providerName === 'groq') {
    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModelName = process.env.GROQ_MODEL ?? 'deepseek-r1-distill-llama-70b';

    if (!groqApiKey) {
      warnings.push('Missing GROQ_API_KEY environment variable. Configure GROQ_API_KEY to enable Groq responses.');
    } else {
      const groqProvider = createGroq({ apiKey: groqApiKey });
      modelFactory = () => groqProvider(groqModelName) as unknown as LanguageModel;
    }

    return { modelFactory, providerName, warnings };
  }

  if (providerName === 'cohere') {
    const cohereApiKey = process.env.COHERE_API_KEY;
    const cohereModelName = process.env.COHERE_MODEL ?? 'command-r-plus';

    if (!cohereApiKey) {
      warnings.push('Missing COHERE_API_KEY environment variable. Configure COHERE_API_KEY to enable Cohere responses.');
    } else {
      const cohereProvider = createCohere({ apiKey: cohereApiKey });
      modelFactory = () => cohereProvider(cohereModelName) as unknown as LanguageModel;
    }

    return { modelFactory, providerName, warnings };
  }

  const geminiAuthTypeEnv = process.env.GEMINI_AUTH_TYPE as GeminiAuthType | undefined;
  const geminiApiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const geminiAuthType: GeminiAuthType = geminiAuthTypeEnv ?? (geminiApiKey ? 'api-key' : 'oauth-personal');
  const missingGeminiApiKey = geminiAuthType !== 'oauth-personal' && !geminiApiKey;

  if (missingGeminiApiKey) {
    warnings.push(
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

  return { modelFactory, providerName, warnings };
}
