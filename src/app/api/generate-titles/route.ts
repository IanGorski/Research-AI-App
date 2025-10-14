import { NextRequest, NextResponse } from 'next/server';
import { generateTitles } from '@/app/actions/generateTitles';

export async function POST(req: NextRequest) {
    try {
        console.log('[API Route] Recibiendo solicitud para generar títulos');
        const { articleText, count } = await req.json();

        console.log('[API Route] Generando títulos:', { count, textLength: articleText?.length });

        // Validar entrada
        if (!articleText) {
            console.error('[API Route] Falta el texto del artículo');
            return NextResponse.json(
                { error: 'Se requiere el texto del artículo' },
                { status: 400 }
            );
        }

        if (!count || count < 1 || count > 10) {
            console.error('[API Route] Count inválido:', count);
            return NextResponse.json(
                { error: 'El count debe estar entre 1 y 10' },
                { status: 400 }
            );
        }

        // Llamar Server.a
        const result = await generateTitles({
            articleText,
            count: parseInt(count.toString()),
        });

        console.log('[API Route] Títulos generados exitosamente:', result.titles.length);

        return NextResponse.json(result);
    } catch (error) {
        console.error('[API Route] Error al generar títulos:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json(
            { error: 'Error al generar títulos', details: errorMessage },
            { status: 500 }
        );
    }
}
