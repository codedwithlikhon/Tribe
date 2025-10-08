import type { LanguageModel } from 'ai';
import { createCohere } from '@ai-sdk/cohere';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import { createGroq } from '@ai-sdk/groq';

/**
 * Supported authentication strategies for Google Generative AI (Gemini).
 */
export type GeminiAuthType = 'oauth-personal' | 'api-key' | 'gemini-api-key';
export type ProviderName = 'gemini' | 'groq' | 'cohere';

/**
 * Structured result returned when building a model factory.
 */
export interface ModelFactoryResult {
  modelFactory: (() => LanguageModel) | null;
  providerName: ProviderName;
  warnings: string[];
}

/**
 * Creates a language model factory based on the configured AI provider.
 *
 * The implementation mirrors the provider guidance from the Vercel AI SDK
 * documentation while preserving the legacy Gemini CLI OAuth flow so existing
 * environments continue to function without breaking changes.
 */
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
  const googleGenerativeAiApiKey =
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GOOGLE_API_KEY;

  const geminiAuthType: GeminiAuthType =
    geminiAuthTypeEnv ?? (googleGenerativeAiApiKey ? 'api-key' : 'oauth-personal');

  const missingGeminiApiKey = geminiAuthType !== 'oauth-personal' && !googleGenerativeAiApiKey;

  if (missingGeminiApiKey) {
    warnings.push(
      'Missing Google Generative AI API key. Configure GEMINI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or GOOGLE_API_KEY, or switch GEMINI_AUTH_TYPE to "oauth-personal" to enable AI features.'
    );
  }

  const googleGenerativeAi = !missingGeminiApiKey
    ? geminiAuthType === 'oauth-personal'
      ? createGeminiProvider({ authType: 'oauth-personal' })
      : createGoogleGenerativeAI({ apiKey: googleGenerativeAiApiKey as string })
    : null;

  const geminiModelName = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';

  if (googleGenerativeAi) {
    modelFactory = () => googleGenerativeAi(geminiModelName) as unknown as LanguageModel;
  }

  return { modelFactory, providerName, warnings };
}
