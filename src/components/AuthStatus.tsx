"use client";

import { useSession, signOut } from "next-auth/react";

export default function AuthStatus() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
            </div>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
