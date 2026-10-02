/**
 * Secure Preview Mode helper utilities for Ramanayam.
 *
 * Implements cryptographically signed, tamper-proof session tokens using
 * the standard Web Cryptography API (supported in Node.js and Edge Runtime).
 *
 * The secret RAMANAYAM_PREVIEW_SECRET is server-only and NEVER sent to the client.
 */

export const PREVIEW_COOKIE_NAME = "__ramanayam_preview_session";
export const PREVIEW_INDICATOR_COOKIE = "__ramanayam_preview_active";
export const PREVIEW_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Validates candidate activation token against RAMANAYAM_PREVIEW_SECRET
 * using timing-safe comparison to prevent timing attacks.
 */
export async function verifyPreviewToken(candidateToken: string | null | undefined): Promise<boolean> {
  const secret = process.env.RAMANAYAM_PREVIEW_SECRET;
  if (!candidateToken || !secret || typeof candidateToken !== "string" || typeof secret !== "string") {
    return false;
  }

  const trimmedToken = candidateToken.trim();
  const trimmedSecret = secret.trim();

  if (trimmedSecret.length === 0 || trimmedToken.length === 0) {
    return false;
  }

  try {
    const enc = new TextEncoder();
    const candidateHash = await crypto.subtle.digest("SHA-256", enc.encode(trimmedToken));
    const secretHash = await crypto.subtle.digest("SHA-256", enc.encode(trimmedSecret));

    const candidateArr = new Uint8Array(candidateHash);
    const secretArr = new Uint8Array(secretHash);

    let diff = 0;
    for (let i = 0; i < candidateArr.length; i++) {
      diff |= candidateArr[i] ^ secretArr[i];
    }
    return diff === 0;
  } catch {
    return false;
  }
}

/**
 * Creates an HMAC-SHA256 signed preview session token.
 * Format: v1:<issuedAt>:<expiresAt>:<hexSignature>
 */
export async function createPreviewSession(): Promise<string> {
  const secret = process.env.RAMANAYAM_PREVIEW_SECRET?.trim();
  if (!secret) {
    throw new Error("RAMANAYAM_PREVIEW_SECRET is not configured");
  }

  const issuedAt = Date.now();
  const expiresAt = issuedAt + PREVIEW_MAX_AGE_SECONDS * 1000;
  const payloadStr = `v1:${issuedAt}:${expiresAt}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payloadStr));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${payloadStr}:${signatureHex}`;
}

/**
 * Verifies the integrity, signature, and expiration of a preview session cookie.
 */
export async function verifyPreviewSession(cookieValue: string | null | undefined): Promise<boolean> {
  const secret = process.env.RAMANAYAM_PREVIEW_SECRET?.trim();
  if (!cookieValue || !secret || typeof cookieValue !== "string") {
    return false;
  }

  const parts = cookieValue.split(":");
  if (parts.length !== 4) {
    return false;
  }

  const [version, issuedAtStr, expiresAtStr, signatureHex] = parts;
  if (version !== "v1") {
    return false;
  }

  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const payloadStr = `${version}:${issuedAtStr}:${expiresAtStr}`;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payloadStr));
  } catch {
    return false;
  }
}
