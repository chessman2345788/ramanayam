import { CookieOptions } from "express";

export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
  RESET_TOKEN_EXPIRY: "15m",
  COOKIE_NAME: "refreshToken",
};

export const getCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction, // Send over HTTPS only in production
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: "/",
  };
};
