'use server';

import { generateObject } from 'ai';
import { z } from 'zod';
import { openaiClient, TASK_CONFIGS, validateOpenAIKey } from '@/services/openaiService';
import { validateTitleInput } from '@/services/validationService';

const titleSchema = z.object({
    titles: z.array(z.string()).describe('Array of article titles'),
});

export interface GenerateTitlesInput {
    articleText: string;
    count: number;
}
export async function generateTitles(input: GenerateTitlesInput) {
    try {
        // Validar API Key
        if (!validateOpenAIKey()) {
            throw new Error('API Key de OpenAI no configurada. Por favor, configura OPENAI_API_KEY en las variables de entorno.');
        }

        // Validación de entrada usando el servicio de validación
        const validation = validateTitleInput(input.articleText, input.count);
        if (!validation.isValid) {
            throw new Error(validation.error);
        }

        console.log('[Server Action] Generando', input.count, 'títulos para artículo de longitud:', input.articleText.length);

        const { object } = await generateObject({
            model: openaiClient(TASK_CONFIGS.TITLE_GENERATION.model),
            schema: titleSchema,
            prompt: `Genera exactamente ${input.count} títulos periodísticos creativos y atractivos para el siguiente artículo. 
    Los títulos deben ser profesionales, captar la atención y resumir la esencia del artículo.
    Cada título debe ser único y diferente.
    
    Artículo:
    ${input.articleText.substring(0, 1000)}
    
    Devuelve exactamente ${input.count} títulos en el array.`,
        });

        console.log('[Server Action] Títulos generados:', object.titles.length);

        // Validar que se generaron la cantidad correcta de títulos (1-10)
        if (object.titles.length !== input.count) {
            console.warn(`Se solicitaron ${input.count} títulos pero se generaron ${object.titles.length}`);
        }

        return { titles: object.titles };
    } catch (error) {
        console.error('[Server Action] Error al generar títulos:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        throw new Error(`Error al generar títulos: ${errorMessage}`);
    }
}
