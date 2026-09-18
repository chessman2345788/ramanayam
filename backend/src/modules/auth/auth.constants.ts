import { CookieOptions } from "express";

export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
  RESET_TOKEN_EXPIRY: "15m",
  COOKIE_NAME: "refreshToken",
};

export const getCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === "production";
  // In cross-origin production deployments (e.g. storefront at ramayanam.in, API on onrender.com),
  // sameSite must be "none" with secure: true to prevent browsers from dropping credentials.
  const rawSameSite = process.env.COOKIE_SAMESITE?.toLowerCase();
  const sameSite: "none" | "lax" | "strict" =
    rawSameSite === "none" || rawSameSite === "lax" || rawSameSite === "strict"
      ? (rawSameSite as "none" | "lax" | "strict")
      : isProduction
        ? "none"
        : "lax";

  const secure = isProduction || sameSite === "none";

  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: "/",
  };
};
