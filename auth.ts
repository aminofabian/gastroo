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
      try {
        // Initialize OAuth user with default values
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            emailVerified: new Date(),
            role: "USER" as UserRole,
            isOnboarded: false, // Explicitly set to false for new users
            profileCompleteness: 0, // Set initial profile completeness
            // Split name into firstName and lastName if available
            ...(user.name && {
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ').slice(1).join(' ') || undefined
            })
          },
        });
        console.log(`User ${user.id} initialized successfully`);
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    },
  },
  ...authConfig,
});