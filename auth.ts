import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { UserRole } from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as any, // temporary type assertion to resolve conflict
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async linkAccount({ user }) {
      // Initialize OAuth user with default values
      await db.user.update({
        where: { id: user.id },
        data: { 
          emailVerified: new Date(),
          role: "USER" as UserRole,
          // Split name into firstName and lastName if available
          ...(user.name && {
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ').slice(1).join(' ') || undefined
          })
        },
      });
    },
  },
  ...authConfig,
});