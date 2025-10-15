import React from 'react';
import MainPageClient from '@/components/MainPageClient';
import AuthStatus from '@/components/AuthStatus';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <AuthStatus />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Research AI App</h1>
        <p className="text-center text-gray-600 mb-8">
          Plataforma de investigación y generación de contenido con IA
        </p>

        <MainPageClient />
      </div>
    </div>
  );
}
