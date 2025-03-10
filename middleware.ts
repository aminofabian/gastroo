import { auth } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  const isAuthPage = nextUrl.pathname === "/login";
  const isMembershipPage = nextUrl.pathname === "/membership";
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

  return NextResponse.next();
})

// Specify which routes should be protected
export const config = {
  matcher: [
    "/membership",
    "/login",
    "/admin/:path*",
    "/api/admin/:path*"
  ]
}