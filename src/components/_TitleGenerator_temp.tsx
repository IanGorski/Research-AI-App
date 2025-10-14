'use client';

import React, { useState } from 'react';

interface ResearchResult {
    title: string;
    url: string;
    summary?: string;
    author?: string;
}

interface ResearchPanelProps {
    onResultSelected?: (result: ResearchResult) => void;
}

const ResearchPanel: React.FC<ResearchPanelProps> = ({ onResultSelected }) => {
    const [topic, setTopic] = useState('');
    const [results, setResults] = useState<ResearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleResearch = async () => {
        if (!topic.trim()) {
            alert('Por favor, ingresa un tema de investigaciÃ³n');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                throw new Error('Error al realizar la investigaciÃ³n');
            }

            const data = await response.json();
            const allResults = [...(data.worthExpanding || []), ...(data.notWorthExpanding || [])];
            setResults(allResults);
        } catch (err) {
            setError('Error al realizar la investigaciÃ³n. Por favor, intenta de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const categorizeResults = () => {
        const worthExpanding = results.filter(result => {
            const content = result.summary || '';
            return content.length > 100;
        });
        const notWorthExpanding = results.filter(result => {
            const content = result.summary || '';
            return content.length <= 100;
        });
        return { worthExpanding, notWorthExpanding };
    };

    const { worthExpanding, notWorthExpanding } = categorizeResults();

    const handleGenerateArticle = (result: ResearchResult) => {
        if (onResultSelected) {
            onResultSelected(result);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">InvestigaciÃ³n con Exa API</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tema de InvestigaciÃ³n
                </label>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ej: Inteligencia Artificial, Cambio ClimÃ¡tico, etc."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                    />
                    <button
                        onClick={handleResearch}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Investigando...' : 'Investigar'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {results.length > 0 && (
                <div className="space-y-8">
                    {/* Vale la pena expandir */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-green-700">
                            Vale la pena expandir ({worthExpanding.length})
                        </h3>
                        {worthExpanding.length > 0 ? (
                            <div className="space-y-4">
                                {worthExpanding.map((result, index) => (
                                    <div key={index} className="p-5 bg-green-50 border border-green-200 rounded-lg">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{result.title}</h4>
                                        <a
                                            href={result.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 text-sm hover:underline mb-2 block"
                                        >
                                            {result.url}
                                        </a>
                                        {result.summary && (
                                            <p className="text-gray-700 mb-3">{result.summary}</p>
                                        )}
                                        {result.author && (
                                            <p className="text-gray-500 text-sm mb-3">Autor: {result.author}</p>
                                        )}
                                        <button
                                            onClick={() => handleGenerateArticle(result)}
                                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                        >
                                            Generar ArtÃ­culo desde este Resultado
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No hay resultados en esta categorÃ­a.</p>
                        )}
                    </div>

                    {/* No vale la pena expandir */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-700">
                            No vale la pena expandir ({notWorthExpanding.length})
                        </h3>
                        {notWorthExpanding.length > 0 ? (
                            <div className="space-y-4">
                                {notWorthExpanding.map((result, index) => (
                                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{result.title}</h4>
                                        <a
                                            href={result.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 text-sm hover:underline block"
                                        >
                                            {result.url}
                                        </a>
                                        {result.summary && (
                                            <p className="text-gray-600 text-sm mt-2">{result.summary}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No hay resultados en esta categorÃ­a.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResearchPanel;

