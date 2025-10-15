import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        /*
         * Protege todas las rutas excepto:
         * - /login (página de inicio de sesión)
         * - /api/auth (rutas de autenticación de NextAuth)
         * - /_next (archivos estáticos de Next.js)
         * - /favicon.ico
         */
        "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
