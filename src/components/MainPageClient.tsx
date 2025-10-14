"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ArticleGenerator from './ArticleGenerator';
import TitleGenerator from './TitleGenerator';
import ResearchPanel from './ResearchPanel';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

interface ResearchResult {
  title: string;
  url: string;
  summary?: string;
  author?: string;
}

/**
 * Componente Client que maneja toda la lógica interactiva de la página principal.
 * Separado del Server Component para optimizar el rendering.
 */
const MainPageClient: React.FC = () => {
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [activeTab, setActiveTab] = useState<'research' | 'generate'>('research');
  const [selectedResearchResult, setSelectedResearchResult] = useState<ResearchResult | null>(null);

  const handleArticleGenerated = (article: string) => {
    setGeneratedArticle(article);
    setEditorContent(article);
  };

  const handleTitleSelected = (title: string) => {
    setSelectedTitle(title);
    setEditorContent(`# ${title}\n\n${generatedArticle}`);
  };

  const handleResearchResultSelected = (result: ResearchResult) => {
    setSelectedResearchResult(result);
    setActiveTab('generate');
    console.log(`Resultado seleccionado: ${result.title}`);
  };

  return (
    <>
      {/* Pestañas */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-8 py-3 font-semibold rounded-lg transition-colors ${activeTab === 'research'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          🔍 Investigación con Exa
        </button>
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-8 py-3 font-semibold rounded-lg transition-colors ${activeTab === 'generate'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          ✨ Generar Artículo
        </button>
      </div>

      <div className="space-y-8">
        {/* Panel de Investigación */}
        {activeTab === 'research' && (
          <ResearchPanel onResultSelected={handleResearchResultSelected} />
        )}

        {/* Panel de Generación de Artículos */}
        {activeTab === 'generate' && (
          <>
            {/* Generador de Artículos */}
            <ArticleGenerator
              onArticleGenerated={handleArticleGenerated}
              researchResult={selectedResearchResult}
            />

            {/* Generador de Títulos */}
            {generatedArticle && (
              <TitleGenerator
                articleText={generatedArticle}
                onTitleSelected={handleTitleSelected}
              />
            )}

            {/* Editor de Texto */}
            {generatedArticle && (
              <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Editor de Artículo</h2>
                {selectedTitle && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Título seleccionado:</p>
                    <p className="text-lg font-bold text-blue-900">{selectedTitle}</p>
                  </div>
                )}
                <TextEditor
                  content={editorContent}
                  onChange={(newContent) => setEditorContent(newContent)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MainPageClient;
