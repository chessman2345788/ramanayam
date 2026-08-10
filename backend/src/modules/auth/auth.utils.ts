import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { AUTH_CONSTANTS } from "./auth.constants";
import { TokenPayload, RefreshTokenPayload, ResetTokenPayload } from "./auth.types";
import logger from "../../components/logger";

// ─── Secret Management ───────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "access_token_secret_key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_token_secret_key";

if (JWT_SECRET === "access_token_secret_key") {
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: JWT_SECRET must be set to a strong secret in production. Aborting.");
  }
  logger.warn("⚠  JWT_SECRET is using the default fallback. Set a strong secret in .env for production.");
}
if (JWT_REFRESH_SECRET === "refresh_token_secret_key") {
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: JWT_REFRESH_SECRET must be set to a strong secret in production. Aborting.");
  }
  logger.warn("⚠  JWT_REFRESH_SECRET is using the default fallback. Set a strong secret in .env for production.");
}

// ─── Password Hashing ────────────────────────────────────────────────
// Cost factor 12 provides ~250ms on a modern CPU — strong against offline attacks
const BCRYPT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// ─── Hash Fingerprint (for single-use reset tokens) ─────────────────
export const createHashFingerprint = (passwordHash: string): string => {
  return crypto.createHash("sha256").update(passwordHash).digest("hex").slice(0, 16);
};

// ─── Token Generation ────────────────────────────────────────────────
export const generateAccessToken = (payload: { id: string; role: string }): string => {
  const options: SignOptions = { expiresIn: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const generateRefreshToken = (payload: { id: string }): string => {
  const options: SignOptions = { expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_REFRESH_SECRET, options);
};

export const generateResetToken = (payload: {
  id: string;
  email: string;
  hashFingerprint: string;
}): string => {
  const options: SignOptions = { expiresIn: AUTH_CONSTANTS.RESET_TOKEN_EXPIRY as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
};

// ─── Token Verification ─────────────────────────────────────────────
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
};

export const verifyResetToken = (token: string): ResetTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as ResetTokenPayload;
};
