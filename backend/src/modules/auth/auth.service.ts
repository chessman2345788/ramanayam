import { AuthRepository } from "./auth.repository";
import { AppError } from "../../common/errors";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
  verifyResetToken,
  createHashFingerprint,
} from "./auth.utils";
import { UserResponse, AuthResponse } from "./auth.types";
import { User, AccountStatus } from "@prisma/client";
import logger from "../../components/logger";

import { sendMail } from "../../components/email";

// ─── Typed DTOs ──────────────────────────────────────────────────────
interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  profileImage?: string | null;
}

// ─── Service ─────────────────────────────────────────────────────────
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  private mapUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      accountStatus: user.accountStatus,
      profileImage: user.profileImage,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async register(data: RegisterDto): Promise<AuthResponse & { refreshToken: string }> {
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) {
      throw new AppError("Email is already registered", 400);
    }

    if (data.phone) {
      const existingPhone = await this.repository.findByPhone(data.phone);
      if (existingPhone) {
        throw new AppError("Phone number is already registered", 400);
      }
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await this.repository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      passwordHash: hashedPassword,
    });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    return {
      user: this.mapUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: LoginDto): Promise<AuthResponse & { refreshToken: string }> {
    const user = await this.repository.findByEmail(credentials.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (user.accountStatus === AccountStatus.BLOCKED) {
      throw new AppError("Your account has been blocked. Please contact support.", 403);
    }

    const isMatch = await comparePassword(credentials.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    // Update last login timestamp
    await this.repository.update(user.id, { lastLogin: new Date() });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    return {
      user: this.mapUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<AuthResponse & { refreshToken: string }> {
    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    const user = await this.repository.findById(decoded.id);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    if (user.accountStatus === AccountStatus.BLOCKED) {
      throw new AppError("User account is blocked", 403);
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    return {
      user: this.mapUserResponse(user),
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      // Generic response to prevent user enumeration
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return;
    }

    const hashFingerprint = createHashFingerprint(user.passwordHash);
    const resetToken = generateResetToken({
      id: user.id,
      email: user.email,
      hashFingerprint,
    });

    // Send reset token via email
    if (process.env.NODE_ENV !== "production") {
      logger.info(`[DEV ONLY] Password Reset Token for ${email}: ${resetToken}`);
    }
    
    await sendMail(
      email,
      "Password Reset Request - Ramanayam",
      `<p>Hello,</p><p>You requested a password reset. Use the following token to reset your password:</p><p><b>${resetToken}</b></p><p>If you did not request this, please ignore this email.</p>`,
    );
  }

  async resetPassword(resetDto: ResetPasswordDto): Promise<void> {
    let decoded;
    try {
      decoded = verifyResetToken(resetDto.token);
    } catch {
      throw new AppError("Invalid or expired reset token", 400);
    }

    const user = await this.repository.findById(decoded.id);
    if (!user) {
      throw new AppError("Invalid reset token", 400);
    }

    // Single-use validation: compare hash fingerprint
    const currentFingerprint = createHashFingerprint(user.passwordHash);
    if (currentFingerprint !== decoded.hashFingerprint) {
      throw new AppError("This reset token has already been used", 400);
    }

    const hashedPassword = await hashPassword(resetDto.newPassword);
    await this.repository.update(user.id, { passwordHash: hashedPassword });
  }

  async changePassword(userId: string, changeDto: ChangePasswordDto): Promise<void> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await comparePassword(changeDto.oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", 400);
    }

    // Prevent reusing the current password
    const isSame = await comparePassword(changeDto.newPassword, user.passwordHash);
    if (isSame) {
      throw new AppError("New password must be different from your current password", 400);
    }

    const hashedPassword = await hashPassword(changeDto.newPassword);
    await this.repository.update(userId, { passwordHash: hashedPassword });
    logger.info(`Password changed successfully for user: ${userId}`);
  }

  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return this.mapUserResponse(user);
  }

  async updateProfile(userId: string, profileDto: UpdateProfileDto): Promise<UserResponse> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (profileDto.phone && profileDto.phone !== user.phone) {
      const existingPhone = await this.repository.findByPhone(profileDto.phone);
      if (existingPhone) {
        throw new AppError("Phone number is already registered to another user", 400);
      }
    }

    // Whitelist allowed fields to prevent arbitrary field injection
    const allowedUpdate: Record<string, unknown> = {};
    if (profileDto.firstName !== undefined) allowedUpdate.firstName = profileDto.firstName;
    if (profileDto.lastName !== undefined) allowedUpdate.lastName = profileDto.lastName;
    if (profileDto.phone !== undefined) allowedUpdate.phone = profileDto.phone;
    if (profileDto.profileImage !== undefined) allowedUpdate.profileImage = profileDto.profileImage;

    const updatedUser = await this.repository.update(userId, allowedUpdate);
    return this.mapUserResponse(updatedUser);
  }
}
