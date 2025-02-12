import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simplified middleware configuration
export function middleware(request: NextRequest) {
  // Basic middleware logic
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and API routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
}