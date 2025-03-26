import { NextResponse } from "next/server";
import { auth, signOut } from "@/auth";

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json({ 
        error: "No session found",
        success: false
      }, { status: 401 });
    }
    
    // Force sign out to clear the session
    await signOut({ redirectTo: "/auth/login" });
    
    return NextResponse.json({
      success: true,
      message: "Session refreshed. Please sign in again to update your session data.",
      redirectUrl: "/auth/login"
    });
  } catch (error: any) {
    console.error("Error refreshing session:", error);
    return NextResponse.json({ 
      error: `Error refreshing session: ${error.message}`,
      success: false
    }, { status: 500 });
  }
} 