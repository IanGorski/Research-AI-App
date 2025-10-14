import { createOpenAI } from '@ai-sdk/openai';

// Validar que la API Key esté configurada
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ OPENAI_API_KEY no está configurada. Las funcionalidades de IA no estarán disponibles.');
}

/**
 * Cliente de OpenAI configurado con la API Key del entorno.
 */
export const openaiClient = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Modelos.
 */
export const OPENAI_MODELS = {
  GPT4_TURBO: 'gpt-4-turbo',
  GPT4_MINI: 'gpt-4o-mini',
  GPT4: 'gpt-4',
  GPT35_TURBO: 'gpt-3.5-turbo',
} as const;

/**
 * Configuraciones predeterminadas para diferentes tipos de tareas.
 */
export const TASK_CONFIGS = {
  ARTICLE_GENERATION: {
    model: OPENAI_MODELS.GPT4_TURBO,
    temperature: 0.7,
    maxTokens: 2000,
  },
  TITLE_GENERATION: {
    model: OPENAI_MODELS.GPT4_MINI,
    temperature: 0.8,
    maxTokens: 100,
  },
} as const;

/**
 * Validación de la existencia de la API Key de OpenAI.
 */
export function validateOpenAIKey(): boolean {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 0;
}
