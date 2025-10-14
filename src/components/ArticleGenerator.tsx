'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ResearchResult {
    title: string;
    url: string;
    summary?: string;
    author?: string;
}

interface ArticleGeneratorProps {
    onArticleGenerated?: (article: string) => void;
    researchResult?: ResearchResult | null;
}

const MIN_ARTICLE_LENGTH = 100;
const ERROR_MESSAGES = {
    INVALID_IMAGE: 'Por favor, selecciona un archivo de imagen válido.',
    NO_CONTENT: 'El servidor no devolvió contenido. Verifica tu API key de OpenAI.',
    GENERATION_ERROR: 'Error al generar el artículo. Por favor, intenta de nuevo.',
    API_ERROR: (status: number, statusText: string) => `Error al generar el artículo: ${status} ${statusText}`,
} as const;

const useContentStream = () => {
    const [streamedContent, setStreamedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const streamResponse = async (response: Response): Promise<string> => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        if (!reader) {
            throw new Error('No se pudo obtener el lector del stream');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullContent += chunk;
            setStreamedContent(fullContent);
        }

        return fullContent;
    };

    const resetStream = () => {
        setStreamedContent('');
    };

    return { streamedContent, isLoading, setIsLoading, streamResponse, resetStream };
};

const ArticleGenerator: React.FC<ArticleGeneratorProps> = ({ onArticleGenerated, researchResult }) => {
    const [inputType, setInputType] = useState<'url' | 'topic' | 'image'>('topic');
    const [inputValue, setInputValue] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastProcessedResult, setLastProcessedResult] = useState<string | null>(null);

    const { streamedContent, isLoading, setIsLoading, streamResponse, resetStream } = useContentStream();

    /**
     * Generación de artículo desde la API + validación + manejo de errores
    */
    const generateFromAPI = useCallback(async (
        body: { inputType: string; inputValue?: string; imageData?: string },
        userPrompt: string
    ) => {
        setIsLoading(true);
        setMessages([]);
        resetStream();

        try {
            const response = await fetch('/api/generate-article', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                await response.text(); // Consumir el response
                throw new Error(ERROR_MESSAGES.API_ERROR(response.status, response.statusText));
            }

            const fullContent = await streamResponse(response);

            if (!fullContent || fullContent.length < MIN_ARTICLE_LENGTH) {
                throw new Error(ERROR_MESSAGES.NO_CONTENT);
            }

            setMessages([
                { role: 'user', content: userPrompt },
                { role: 'assistant', content: fullContent },
            ]);

            onArticleGenerated?.(fullContent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setMessages([{
                role: 'assistant',
                content: `${errorMessage}\n\nPor favor, verifica:\n1. Tu API key de OpenAI en el archivo .env\n2. Que tengas créditos disponibles en tu cuenta de OpenAI\n3. La consola del servidor para más detalles`,
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [onArticleGenerated, streamResponse, setIsLoading, resetStream]);

    /**
     * Manejo de generación desde resultados de investigación
     */
    const handleGenerateFromResearch = useCallback(async (result: ResearchResult) => {
        const resultId = result.url || result.title;
        
        if (lastProcessedResult === resultId) {
            return; // No duplica
        }
        
        setLastProcessedResult(resultId);
        
        const enrichedPrompt = `${result.title}${result.summary ? '\n\nContexto: ' + result.summary : ''}`;
        
        await generateFromAPI(
            { inputType: 'topic', inputValue: enrichedPrompt },
            result.title
        );
    }, [lastProcessedResult, generateFromAPI]);

    /**
     * Efecto para manejar resultados de investigación
     */
    useEffect(() => {
        if (researchResult && !isLoading) {
            setInputValue(researchResult.title || '');
            setInputType('topic');
            handleGenerateFromResearch(researchResult);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [researchResult]);

    /**
     * Manejo de cambio de archivo de imagen
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert(ERROR_MESSAGES.INVALID_IMAGE);
            return;
        }

        setImageFile(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    /**
     * Manejo de formulario de generación
     */
    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        const body: { inputType: string; inputValue?: string; imageData?: string } = {
            inputType,
        };

        if (inputType === 'image') {
            body.imageData = imagePreview || '';
        } else {
            body.inputValue = inputValue;
        }

        await generateFromAPI(body, inputValue);
    };

    /**
     * Cambio de input y limpieza de estado relacionado
     */
    const changeInputType = (type: 'url' | 'topic' | 'image') => {
        setInputType(type);
        if (type === 'image') {
            setInputValue('');
        }
        setImageFile(null);
        setImagePreview(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Generador de Artículos con IA
            </h2>

            {/* Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Entrada
                </label>
                <div className="flex gap-4" role="group" aria-label="Tipo de entrada para el artículo">
                    {(['topic', 'url', 'image'] as const).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => changeInputType(type)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                inputType === type
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            aria-pressed={inputType === type}
                            aria-label={`Generar desde ${type === 'topic' ? 'tema' : type === 'url' ? 'URL' : 'imagen'}`}
                        >
                            {type === 'topic' ? 'Tema' : type === 'url' ? 'URL' : 'Imagen'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleGenerate} className="mb-6">
                {inputType === 'image' ? (
                    <div className="mb-4">
                        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                            Selecciona una imagen
                        </label>
                        <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            aria-label="Seleccionar archivo de imagen"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                                <div className="relative w-full max-w-md mx-auto h-64">
                                    <Image
                                        src={imagePreview}
                                        alt="Vista previa de imagen seleccionada"
                                        fill
                                        className="object-contain rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mb-4">
                        <label htmlFor="article-input" className="block text-sm font-medium text-gray-700 mb-2">
                            {inputType === 'topic' ? 'Ingresa el tema del artículo' : 'Ingresa la URL'}
                        </label>
                        <input
                            key={inputType}
                            id="article-input"
                            name="article-input"
                            type="text"
                            value={inputValue || ''}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={
                                inputType === 'topic'
                                    ? 'Ej: Inteligencia Artificial en el periodismo'
                                    : 'Ej: https://ejemplo.com/articulo'
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            aria-label={inputType === 'topic' ? 'Tema del artículo' : 'URL del artículo'}
                        />
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isLoading || (inputType !== 'image' && !inputValue) || (inputType === 'image' && !imageFile)}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    aria-label={isLoading ? 'Generando artículo...' : 'Generar artículo'}
                >
                    {isLoading ? 'Generando...' : 'Generar Artículo'}
                </button>
            </form>

            {/* Área de Resultado */}
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Artículo Generado</h3>
                <div className="bg-gray-50 p-6 rounded-lg min-h-[300px] max-h-[600px] overflow-y-auto">
                    {messages.length === 0 && !streamedContent ? (
                        <p className="text-gray-500 italic">
                            El artículo aparecerá aquí en tiempo real mientras se genera...
                        </p>
                    ) : (
                        <div className="prose max-w-none">
                            {streamedContent && isLoading && (
                                <p className="text-gray-800 whitespace-pre-wrap">{streamedContent}</p>
                            )}
                            {messages.map((message, index) => (
                                <div key={index} className="mb-4">
                                    {message.role === 'assistant' && (
                                        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleGenerator;
