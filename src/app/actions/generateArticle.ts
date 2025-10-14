'use server';

import { streamText } from 'ai';
import { openaiClient, TASK_CONFIGS, validateOpenAIKey } from '@/services/openaiService';
import { validateArticleInput, sanitizeText } from '@/services/validationService';

export interface GenerateArticleInput {
  url?: string;
  imageUrl?: string;
  topic?: string;
  inputType?: 'url' | 'topic' | 'image';
  inputValue?: string;
  imageData?: string; // Base64 data URI
}
export async function generateArticle(input: GenerateArticleInput) {
  try {
    // Validar API Key
    if (!validateOpenAIKey()) {
      throw new Error('API Key de OpenAI no configurada. Por favor, configura OPENAI_API_KEY en las variables de entorno.');
    }

    // Validación de entrada
    if (!input.url && !input.imageUrl && !input.topic && !input.inputValue && !input.imageData) {
      throw new Error('Debe proporcionar una URL, imagen, tema o valor de entrada.');
    }

    let prompt = '';
    
    // Generar prompt basado en el tipo de entrada
    if (input.inputType === 'topic' && input.inputValue) {
      // Validar entrada
      const validation = validateArticleInput('topic', input.inputValue);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const sanitizedInput = sanitizeText(input.inputValue);
      
      prompt = `Genera un artículo periodístico completo y bien estructurado sobre el tema: "${sanitizedInput}". 
      El artículo debe incluir:
      - Una introducción atractiva que enganche al lector
      - Desarrollo detallado con contexto, datos relevantes y perspectivas múltiples
      - Análisis profundo del tema
      - Conclusiones relevantes y reflexiones finales
      - Formato profesional apto para publicación periodística
      - Extensión: Entre 500-800 palabras`;
    } else if (input.inputType === 'image' && input.imageData) {
      prompt = `Analiza esta imagen y genera un artículo periodístico completo basado en lo que observas. 
      El artículo debe incluir:
      - Una descripción detallada de la imagen
      - Contexto y análisis de lo que representa
      - Implicaciones y significado periodístico
      - Una narrativa coherente y profesional
      - Formato apto para publicación periodística`;
    } else if (input.inputType === 'url' && input.inputValue) {
      // Validar URL
      const validation = validateArticleInput('url', input.inputValue);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      prompt = `Genera un artículo periodístico completo basado en el contenido que se encuentra en esta URL: "${input.inputValue}". 
      Analiza el contenido y crea un artículo original que:
      - Resuma los puntos clave
      - Agregue contexto y análisis
      - Presente una narrativa coherente y profesional
      - Sea apto para publicación periodística`;
    } else if (input.url) {
      const sanitizedUrl = sanitizeText(input.url);
      prompt = `Genera un artículo periodístico completo y bien estructurado basado en el contenido de esta URL: ${sanitizedUrl}. 
      El artículo debe incluir:
      - Una introducción atractiva
      - Desarrollo con datos y contexto
      - Conclusiones relevantes
      - Formato profesional para un periodista`;
    } else if (input.imageUrl) {
      const sanitizedImageUrl = sanitizeText(input.imageUrl);
      prompt = `Genera un artículo periodístico basado en el análisis de esta imagen: ${sanitizedImageUrl}. 
      Describe lo que ves y crea una narrativa periodística alrededor de ello.`;
    } else if (input.topic) {
      const sanitizedTopic = sanitizeText(input.topic);
      prompt = `Genera un artículo periodístico completo sobre: ${sanitizedTopic}. 
      El artículo debe ser informativo, bien investigado y apto para publicación.`;
    }

    console.log('[Server Action] Generando artículo con prompt:', prompt.substring(0, 100));

    if (input.inputType === 'image' && input.imageData) {
      const result = await streamText({
        model: openaiClient('gpt-4o'), 
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image',
                image: input.imageData,
              },
            ],
          },
        ],
        temperature: TASK_CONFIGS.ARTICLE_GENERATION.temperature,
      });

      return result.toTextStreamResponse();
    }

    const result = await streamText({
      model: openaiClient(TASK_CONFIGS.ARTICLE_GENERATION.model),
      prompt,
      temperature: TASK_CONFIGS.ARTICLE_GENERATION.temperature,
    });
    
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[Server Action] Error al generar artículo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al generar artículo: ${errorMessage}`);
  }
}
