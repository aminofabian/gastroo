import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

// List of allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
  "fabianngaira@gmail.com",
  "aminofabian@gmail.com",
  // Add more admin emails here
];

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/api/admin");
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Debug logging
  console.log("Auth Debug:", {
    isLoggedIn,
    user: req.auth?.user,
    email: req.auth?.user?.email,
    role: req.auth?.user?.role,
    isAdminRoute,
  });

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  // Check for admin route access
  if (isAdminRoute) {
    const userRole = req.auth?.user?.role;
    
    // Debug logging for admin check
    console.log("Admin Check:", {
      userRole,
      email: req.auth?.user?.email,
      shouldRedirect: userRole !== "ADMIN"
    });
    
    if (userRole !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // exclude all files with extensions
    "/",  // include root
    "/(api/admin|api/auth)(.*)",  // only protect admin and auth API routes
  ],
};
