import { auth } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthPage = nextUrl.pathname === "/login";
  const isMembershipPage = nextUrl.pathname === "/membership";

  // If trying to access membership page while not logged in
  if (isMembershipPage && !isLoggedIn) {
    return Response.redirect(new URL("/login?callbackUrl=/membership", nextUrl));
  }

  // If trying to access login page while already logged in
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return null;
})

// Specify which routes should be protected
export const config = {
  matcher: ["/membership", "/login"]
}