import { NextRequest, NextResponse } from 'next/server';
import { searchAndCategorize, validateExaKey } from '@/services/exaApi';

export async function POST(request: NextRequest) {
  try {
    // Validar API Key
    if (!validateExaKey()) {
      return NextResponse.json(
        { error: 'La API Key de Exa no está configurada.' },
        { status: 500 }
      );
    }

    const { topic } = await request.json();

    // Validar entrada
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'El tema de investigación es requerido.' },
        { status: 400 }
      );
    }

    console.log('[API Route] Iniciando búsqueda para:', topic);

    const categorizedResults = await searchAndCategorize(topic);

    console.log('[API Route] Búsqueda completada:', {
      worthExpanding: categorizedResults.worthExpanding.length,
      notWorthExpanding: categorizedResults.notWorthExpanding.length,
    });

    return NextResponse.json(categorizedResults);
  } catch (error) {
    console.error('[API Route] Error al realizar la investigación:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: 'Error al realizar la investigación.', details: errorMessage },
      { status: 500 }
    );
  }
}