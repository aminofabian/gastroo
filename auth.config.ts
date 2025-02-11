import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { Session } from "next-auth";

async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await verifyPassword(password, user.password);
          if (passwordsMatch) {
            return {
              ...user,
              isTwoFactorEnabled: false
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        return true;
      }

      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id ?? "");
        if (!existingUser?.emailVerified) return false;
      }
      
      return true;
    },
    async session({ token, session }: { token: any; session: Session }) {
      if (!session.user) return session;

      session.user.id = token.sub as string;
      session.user.name = token.name as string;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.email = token.email as string;
      session.user.role = token.role as UserRole;
      session.user.image = token.picture as string | null;
      session.user.emailVerified = token.emailVerified as Date | null;
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = `${existingUser.firstName || ''} ${existingUser.lastName || ''}`.trim();
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.picture = existingUser.image;
      token.emailVerified = existingUser.emailVerified;
      token.isTwoFactorEnabled = false;

      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl + "/dashboard";
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  trustHost: true,
} satisfies NextAuthConfig;
