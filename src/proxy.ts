import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin(.*)", "/signup(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  // TypeScript-safe: explicitly tell TS what metadata contains
  const roleInSession = (sessionClaims?.metadata as { role?: string })?.role;

  // Admin route protection
  if (isAdminRoute(req) && roleInSession !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Public route check
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
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
