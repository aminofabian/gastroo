import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export const runtime = 'nodejs';

// Move routes directly into middleware to avoid Edge compatibility issues
const publicRoutes = [
  "/",
  "/auth/verify",
];

const authRoutes = [
  "/auth/login",
  "/auth/register",
];

const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Move this to a separate config file if needed
const ALLOWED_ADMIN_EMAILS = [
  "fabianngaira@gmail.com",
  "aminofabian@gmail.com",
  // Add more admin emails here
];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  // Get auth data from headers
  const token = request.cookies.get("next-auth.session-token")?.value;
  const isLoggedIn = !!token;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/api/admin");

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  // Check for admin route access
  if (isAdminRoute && token) {
    const decodedToken = jwtDecode(token) as { role?: string; email?: string };
    
    console.log("Admin Check:", {
      userRole: decodedToken.role,
      email: decodedToken.email,
      shouldRedirect: decodedToken.role !== "ADMIN"
    });
    
    if (decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};