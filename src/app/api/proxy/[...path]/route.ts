import { NextRequest } from "next/server";

/**
 * Server-side proxy for the backend API.
 * Bypasses CORS by making the request from the Next.js server
 * (no browser Origin header) instead of the client browser.
 * 
 * Proxies: /api/proxy/products → BACKEND_URL/products
 *          /api/proxy/categories → BACKEND_URL/categories
 *          etc.
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ramanayam.onrender.com/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const backendPath = path.join("/");

  // Forward query string
  const { searchParams } = request.nextUrl;
  const queryString = searchParams.toString();
  const url = `${BACKEND_URL}/${backendPath}${queryString ? `?${queryString}` : ""}`;

  try {
    const backendRes = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // No credentials needed for public endpoints
      cache: "no-store",
    });

    const data = await backendRes.json();

    const isPreview =
      request.cookies.has("__ramanayam_preview_session") ||
      request.headers.get("x-ramanayam-preview") === "true";

    const cacheHeader = isPreview
      ? "no-store, no-cache, must-revalidate"
      : "public, s-maxage=60, stale-while-revalidate=120";

    return Response.json(data, {
      status: backendRes.status,
      headers: {
        "Cache-Control": cacheHeader,
      },
    });
  } catch (error: any) {
    console.error(`[API Proxy] Error fetching ${url}:`, error?.message);
    return Response.json(
      { success: false, message: "Backend unavailable" },
      { status: 502 }
    );
  }
}
