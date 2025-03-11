import { auth } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";
  
  // Get user ID from session
  const userId = req.auth?.user?.id;
  
  // Initialize isOnboarded from session
  let isOnboarded = req.auth?.user ? (req.auth.user as any).isOnboarded === true : false;
  
  // If logged in but not onboarded according to session, double-check with database
  if (isLoggedIn && !isOnboarded && userId) {
    try {
      // Check database directly for onboarding status
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { isOnboarded: true }
      });
      
      // Update isOnboarded based on database value
      if (dbUser && dbUser.isOnboarded === true) {
        isOnboarded = true;
        console.log("Database check: User is actually onboarded");
      }
    } catch (error) {
      console.error("Error checking database for onboarding status:", error);
      // Continue with session value if database check fails
    }
  }
  
  // Debug logging
  console.log("Middleware - Auth Info:", {
    isLoggedIn,
    isAdmin,
    isOnboarded,
    sessionOnboarded: req.auth?.user ? (req.auth.user as any).isOnboarded : undefined,
    userId
  });

  const isAuthPage = nextUrl.pathname === "/login";
  const isMembershipPage = nextUrl.pathname === "/membership";
  const isDashboardPage = nextUrl.pathname === "/dashboard" || nextUrl.pathname.startsWith("/dashboard/");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/api/admin");

  // If trying to access admin routes without admin privileges
  if (isAdminRoute && (!isLoggedIn || !isAdmin)) {
    return Response.redirect(new URL("/auth/login?callbackUrl=" + nextUrl.pathname, nextUrl));
  }

  // If trying to access membership page while not logged in
  if (isMembershipPage && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login?callbackUrl=/membership", nextUrl));
  }

  // If trying to access login page while already logged in
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // If trying to access dashboard while not onboarded, redirect to membership page
  if (isDashboardPage && isLoggedIn && !isOnboarded) {
    console.log("Redirecting to membership page - User not onboarded");
    return Response.redirect(new URL("/membership?from=dashboard", nextUrl));
  }

  return NextResponse.next();
})

// Specify which routes should be protected
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/membership",
    "/login",
    "/dashboard",
    "/dashboard/:path*"
  ]
}