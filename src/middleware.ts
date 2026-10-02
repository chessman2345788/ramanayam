import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PREVIEW_COOKIE_NAME,
  PREVIEW_INDICATOR_COOKIE,
  PREVIEW_MAX_AGE_SECONDS,
  verifyPreviewToken,
  createPreviewSession,
  verifyPreviewSession,
} from "@/lib/preview";

/**
 * Launch-mode & Private Preview Middleware.
 *
 * Behavior:
 * 1. Preview Endpoints:
 *    - /__preview?token=SECRET → Server-side token validation; sets secure HttpOnly cookie & redirects
 *    - /__preview/exit         → Clears preview session cookie & redirects to Launching Soon
 *
 * 2. Always allowed through:
 *    - /admin/*      → Admin panel & authentication
 *    - /api/*        → Backend API & Proxy routes
 *    - /_next/*      → Next.js internals / static chunks
 *    - Static files  (favicon, images, fonts, etc.)
 *
 * 3. If NEXT_PUBLIC_LAUNCH_MODE=true:
 *    - Checks for valid cryptographically signed preview session cookie (__ramanayam_preview_session).
 *    - If valid preview session:
 *        - Allowed through to the entire storefront (/products, /cart, /checkout, etc.)
 *        - For "/", rewrites internally to "/home" so the complete homepage renders at https://ramayanam.in/
 *    - If no valid preview session:
 *        - "/" renders Launching Soon
 *        - All other storefront routes redirect to "/"
 *
 * 4. If NEXT_PUBLIC_LAUNCH_MODE=false:
 *    - Full public access to storefront.
 */

const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "true";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. PREVIEW ACTIVATION (/__preview?token=...) ───────────
  if (pathname === "/__preview") {
    const token = request.nextUrl.searchParams.get("token");
    const isValid = await verifyPreviewToken(token);

    if (!isValid) {
      // Safe generic 404 to avoid leaking route existence or secret details
      return new NextResponse("Not Found", { status: 404 });
    }

    const sessionToken = await createPreviewSession();
    const rawRedirect = request.nextUrl.searchParams.get("redirect") || "/";
    const destination = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/";
    const response = NextResponse.redirect(new URL(destination, request.url));

    // 1. Server-only HttpOnly signed preview session cookie
    response.cookies.set(PREVIEW_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PREVIEW_MAX_AGE_SECONDS,
    });

    // 2. Client-readable indicator cookie for UI badge
    response.cookies.set(PREVIEW_INDICATOR_COOKIE, "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PREVIEW_MAX_AGE_SECONDS,
    });

    return response;
  }

  // ── 2. PREVIEW EXIT (/__preview/exit) ───────────────────────
  if (pathname === "/__preview/exit") {
    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set(PREVIEW_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set(PREVIEW_INDICATOR_COOKIE, "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  }

  // ── 3. ALWAYS ALLOWED PATHS ────────────────────────────────
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    /\.\w+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ── 4. IF LAUNCH MODE IS OFF ──────────────────────────────
  if (!isLaunchMode) {
    return NextResponse.next();
  }

  // ── 5. LAUNCH MODE IS ON: CHECK PREVIEW SESSION ────────────
  const previewCookie = request.cookies.get(PREVIEW_COOKIE_NAME)?.value;
  const isPreview = await verifyPreviewSession(previewCookie);

  if (isPreview) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-ramanayam-preview", "true");

    // For root path "/", rewrite internally to "/home" so the full storefront renders
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/home", request.url), {
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Allow all other storefront routes (/products, /cart, /checkout, /festivals, etc.)
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // ── 6. NORMAL PUBLIC VISITOR ───────────────────────────────
  // Allow root path "/" to render Launching Soon
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect all other storefront routes to "/" (Launching Soon)
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
