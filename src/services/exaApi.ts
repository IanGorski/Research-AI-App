import axios from 'axios';

const EXA_API_URL = process.env.EXA_API_URL || 'https://api.exa.ai';
const EXA_API_KEY = process.env.EXA_API_KEY;

export interface ExaSearchResult {
  title: string;
  url: string;
  summary?: string;
  author?: string;
  publishedDate?: string;
  score?: number;
}

/**
 * Respuesta de la API Exa.
 */
interface ExaApiResponse {
  results: ExaSearchResult[];
}

/**
 * Resultados categorizados.
 */
export interface CategorizedResults {
  worthExpanding: ExaSearchResult[];
  notWorthExpanding: ExaSearchResult[];
}

/**
 * Validación de la existencia de la API Key de Exa.
 */
export function validateExaKey(): boolean {
  return !!EXA_API_KEY && EXA_API_KEY.length > 0;
}

/**
 * Búsqueda en la API de Exa según el tema proporcionado.
 * @param {string} topic 
 * @returns {Promise<ExaSearchResult[]>} 
 */
export async function searchWithExa(topic: string): Promise<ExaSearchResult[]> {
  if (!validateExaKey()) {
    throw new Error('La API Key de Exa no está configurada. Por favor, agrega EXA_API_KEY en tu archivo .env');
  }

  try {
    console.log('[Exa Service] Realizando búsqueda para:', topic);

    const response = await axios.post<ExaApiResponse>(
      `${EXA_API_URL}/search`,
      {
        query: topic,
        numResults: 10,
        type: 'auto',
        contents: {
          text: true,
          highlights: true,
          summary: true
        }
      },
      {
        headers: {
          'x-api-key': EXA_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('[Exa Service] Resultados obtenidos:', response.data.results?.length || 0);
    return response.data.results || [];
  } catch (error) {
    console.error('[Exa Service] Error al consultar la API:', error);
    if (error instanceof Error) {
      throw new Error(`Error de Exa API: ${error.message}`);
    }
    throw new Error('Error desconocido al consultar Exa API');
  }
}

/**
 * Clasifica los resultados de investigación en dos categorías basándose en la longitud del contenido.
 * @param {ExaSearchResult[]} results - Resultados de investigación.
 * @param {number} minLength - Longitud mínima (default: 100).
 * @returns {CategorizedResults} - Resultados clasificados.
 */
export function categorizeResults(
  results: ExaSearchResult[],
  minLength: number = 100
): CategorizedResults {
  const worthExpanding: ExaSearchResult[] = [];
  const notWorthExpanding: ExaSearchResult[] = [];

  results.forEach(result => {
    const content = result.summary || '';
    if (content.length > minLength) {
      worthExpanding.push(result);
    } else {
      notWorthExpanding.push(result);
    }
  });

  console.log('[Exa Service] Categorización:', {
    total: results.length,
    worthExpanding: worthExpanding.length,
    notWorthExpanding: notWorthExpanding.length,
  });

  return { worthExpanding, notWorthExpanding };
}

/**
 * Búsqueda en la API de Exa y clasificación.
 * @param {string} topic 
 * @returns {Promise<CategorizedResults>}
 */
export async function searchAndCategorize(topic: string): Promise<CategorizedResults> {
  const results = await searchWithExa(topic);
  return categorizeResults(results);
}