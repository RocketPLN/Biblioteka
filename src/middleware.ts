import { auth } from "@/services/auth";
import { NextResponse } from "next/server";

const userRoutes = ["/me", "/order"];

export default auth((req) => {
  if (
    !req.auth &&
    userRoutes.some((route) => req.nextUrl.pathname.includes(route))
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (
    (!req.auth || !req.auth.user.roles.includes("ADMIN")) &&
    req.nextUrl.pathname.includes("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (
    req.auth &&
    (req.nextUrl.pathname.includes("/sign-in") ||
      req.nextUrl.pathname.includes("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
