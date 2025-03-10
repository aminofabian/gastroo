import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/auth.config";

const adapter = PrismaAdapter(prisma) as any; // Type assertion to bypass mismatch

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      // Initialize OAuth user with default values
      await prisma.user.update({
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