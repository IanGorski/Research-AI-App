import { NextRequest, NextResponse } from 'next/server';
import { generateArticle } from '@/app/actions/generateArticle';

export async function POST(req: NextRequest) {
    try {
        const { inputType, inputValue, imageData } = await req.json();

        console.log('[API Route] Recibiendo solicitud:', { inputType, inputValue: inputValue?.substring(0, 50), hasImage: !!imageData });

        // Validar entrada
        if (!inputType || (!inputValue && !imageData)) {
            return NextResponse.json(
                { error: 'Se requiere inputType e inputValue o imageData' },
                { status: 400 }
            );
        }

        // Validar tipo de entrada
        if (inputType !== 'topic' && inputType !== 'url' && inputType !== 'image') {
            return NextResponse.json(
                { error: 'inputType debe ser "topic", "url" o "image"' },
                { status: 400 }
            );
        }

        // Llamar sa
        const result = await generateArticle({
            inputType,
            inputValue,
            imageData,
        });

        console.log('[API Route] Artículo generado exitosamente');

        // Retornar
        return result;
    } catch (error) {
        console.error('[API Route] Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json(
            { error: 'Error al generar el artículo', details: errorMessage },
            { status: 500 }
        );
    }
}
