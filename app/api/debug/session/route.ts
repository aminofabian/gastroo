import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json({ 
        error: "No session found",
        session: null,
        dbUser: null
      }, { status: 401 });
    }
    
    // Get user ID from session
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ 
        error: "No user ID found in session",
        session,
        dbUser: null
      }, { status: 401 });
    }

    // Get user from database to compare with session
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isOnboarded: true,
        profileCompleteness: true,
        role: true
      }
    });

    return NextResponse.json({
      session: {
        ...session,
        user: session.user
      },
      dbUser,
      comparison: {
        sessionOnboarded: (session.user as any).isOnboarded,
        dbOnboarded: dbUser?.isOnboarded,
        match: (session.user as any).isOnboarded === dbUser?.isOnboarded
      }
    });
  } catch (error: any) {
    console.error("Error fetching session debug info:", error);
    return NextResponse.json({ 
      error: `Error fetching session debug info: ${error.message}`,
      session: null,
      dbUser: null
    }, { status: 500 });
  }
} 