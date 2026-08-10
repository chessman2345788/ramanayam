import jwt from "jsonwebtoken";

// Use the same secret as the auth module to prevent token verification mismatches.
const JWT_SECRET = process.env.JWT_SECRET || "access_token_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
};

export const verifyToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
};
