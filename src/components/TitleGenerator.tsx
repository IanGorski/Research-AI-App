
'use client';

import React, { useState } from 'react';

interface TitleGeneratorProps {
    articleText: string;
    onTitleSelected?: (title: string) => void;
}

const MIN_ARTICLE_LENGTH = 100;
const DEFAULT_TITLE_COUNT = 3;
const MIN_TITLE_COUNT = 1;
const MAX_TITLE_COUNT = 10;

const TitleGenerator: React.FC<TitleGeneratorProps> = ({ articleText, onTitleSelected }) => {
    const [titleCount, setTitleCount] = useState(DEFAULT_TITLE_COUNT);
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const validateArticleText = (): boolean => {
        if (!articleText || articleText.length < MIN_ARTICLE_LENGTH) {
            setError(`Necesitas generar un artículo primero (mínimo ${MIN_ARTICLE_LENGTH} caracteres).`);
            return false;
        }
        return true;
    };

    const handleGenerateTitles = async () => {
        if (!validateArticleText()) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/generate-titles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articleText, count: titleCount }),
            });
            if (!response.ok) {
                let errorMessage = `Error HTTP ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    const textError = await response.text();
                    errorMessage = textError.substring(0, 200);
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            if (!data.titles || data.titles.length === 0) throw new Error('No se generaron títulos');
            setGeneratedTitles(data.titles);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(`Error al generar títulos: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTitle = (title: string) => {
        setSelectedTitle(title);
        onTitleSelected?.(title);
    };

    const handleTitleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || DEFAULT_TITLE_COUNT;
        setTitleCount(Math.min(Math.max(value, MIN_TITLE_COUNT), MAX_TITLE_COUNT));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Generador de Títulos Dinámicos</h2>
            <div className="mb-6">
                <label htmlFor="title-count" className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuántos títulos deseas generar?
                </label>
                <div className="flex items-center gap-4">
                    <input
                        id="title-count"
                        type="number"
                        min={MIN_TITLE_COUNT}
                        max={MAX_TITLE_COUNT}
                        value={titleCount}
                        onChange={handleTitleCountChange}
                        className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleGenerateTitles}
                        disabled={isLoading || !articleText}
                        className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generando...' : 'Generar Títulos'}
                    </button>
                </div>
            </div>
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                </div>
            )}
            {generatedTitles.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Títulos Generados ({generatedTitles.length})</h3>
                    <div className="space-y-3">
                        {generatedTitles.map((title, index) => (
                            <div
                                key={`title-${index}`}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    selectedTitle === title ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                                onClick={() => handleSelectTitle(title)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={e => {
                                    if (e.key === 'Enter' || e.key === ' ') handleSelectTitle(title);
                                }}
                                aria-pressed={selectedTitle === title}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-800 font-medium">{title}</p>
                                    {selectedTitle === title && <span className="text-blue-500 font-bold">✓ Seleccionado</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedTitle && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-1">Título Seleccionado:</p>
                    <p className="text-lg font-bold text-green-900">{selectedTitle}</p>
                </div>
            )}
        </div>
    );
};

export default TitleGenerator;
