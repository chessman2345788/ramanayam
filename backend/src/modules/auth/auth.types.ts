import { Request } from "express";
import { UserRole, AccountStatus } from "@prisma/client";

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  accountStatus: AccountStatus;
  profileImage: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}

export interface TokenPayload {
  id: string;
  role: string;
}

export interface RefreshTokenPayload {
  id: string;
}

export interface ResetTokenPayload {
  id: string;
  email: string;
  hashFingerprint: string;
}

export interface RequestWithUser extends Request {
  user?: TokenPayload;
}
