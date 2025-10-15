import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Lista de emails autorizados obtenida desde variables de entorno.
const AUTHORIZED_EMAILS = (process.env.AUTHORIZED_EMAILS || "").split(",");

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verifica si el email del usuario está en la lista de autorizados
      if (user.email && AUTHORIZED_EMAILS.includes(user.email)) {
        return true;
      }
      // Si no está autorizado, rechaza el login
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = "authorized";
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirige a login en caso de error
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
