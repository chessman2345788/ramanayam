import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Launch-mode middleware.
 *
 * When NEXT_PUBLIC_LAUNCH_MODE=true, redirects all public storefront
 * routes to "/" (which renders the Launching Soon page).
 *
 * Allowed through without redirect:
 *   - "/"          → the launch page itself
 *   - "/admin/*"   → admin panel
 *   - "/api/*"     → API routes
 *   - "/_next/*"   → Next.js internals / static assets
 *   - Static files (anything with a file extension)
 */

const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "true";

export function middleware(request: NextRequest) {
  // If launch mode is off, pass everything through
  if (!isLaunchMode) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow: root launch page, admin, api, Next.js internals, static files
  if (
    pathname === "/" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    // Static files (favicon, images, fonts, etc.)
    /\.\w+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect all other storefront routes to the launch page
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *   - _next/static  (static files)
     *   - _next/image   (image optimization)
     *   - favicon.ico   (favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
