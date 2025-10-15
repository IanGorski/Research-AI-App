"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 Acceso Restringido
          </h1>
          <p className="text-gray-600">
            Solo usuarios autorizados pueden acceder
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">❌ Acceso denegado</p>
            <p className="text-sm mt-1">Tu cuenta de Google no está autorizada para acceder a esta aplicación.</p>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <span>Iniciando sesión...</span>
          ) : (
            <>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium mb-1">ℹ️ Información importante</p>
          <p className="text-xs text-blue-700">
            Solo las cuentas de Google autorizadas previamente pueden acceder a esta aplicación.
            Si tu cuenta no está autorizada, contacta al administrador.
          </p>
        </div>
      </div>
    </div>
  );
}
