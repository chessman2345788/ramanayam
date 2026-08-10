import { Response } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../components/response";
import { getCookieOptions, AUTH_CONSTANTS } from "./auth.constants";
import { AppError } from "../../common/errors";
import { RequestWithUser } from "./auth.types";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  register = async (req: RequestWithUser, res: Response): Promise<void> => {
    const { user, accessToken, refreshToken } = await this.service.register(req.body);

    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, refreshToken, getCookieOptions());
    sendSuccess(res, "Registration successful", { user, accessToken }, 201);
  };

  login = async (req: RequestWithUser, res: Response): Promise<void> => {
    const { user, accessToken, refreshToken } = await this.service.login(req.body);

    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, refreshToken, getCookieOptions());
    sendSuccess(res, "Login successful", { user, accessToken });
  };

  logout = async (_req: RequestWithUser, res: Response): Promise<void> => {
    res.clearCookie(AUTH_CONSTANTS.COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });
    sendSuccess(res, "Logout successful");
  };

  refresh = async (req: RequestWithUser, res: Response): Promise<void> => {
    const token = req.cookies[AUTH_CONSTANTS.COOKIE_NAME];
    if (!token) {
      throw new AppError("Refresh token missing", 401);
    }

    const { user, accessToken, refreshToken } = await this.service.refreshToken(token);

    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, refreshToken, getCookieOptions());
    sendSuccess(res, "Token refreshed successfully", { user, accessToken });
  };

  forgotPassword = async (req: RequestWithUser, res: Response): Promise<void> => {
    await this.service.forgotPassword(req.body.email);
    // Always return the same generic message regardless of whether the account exists
    // to prevent user enumeration.
    sendSuccess(res, "If the account exists, a password reset link has been sent to your email.");
  };

  resetPassword = async (req: RequestWithUser, res: Response): Promise<void> => {
    await this.service.resetPassword(req.body);
    sendSuccess(res, "Password reset successful");
  };

  changePassword = async (req: RequestWithUser, res: Response): Promise<void> => {
    if (!req.user) throw new AppError("Unauthorized access", 401);
    await this.service.changePassword(req.user.id, req.body);
    sendSuccess(res, "Password changed successfully");
  };

  getCurrentUser = async (req: RequestWithUser, res: Response): Promise<void> => {
    if (!req.user) throw new AppError("Unauthorized access", 401);
    const user = await this.service.getCurrentUser(req.user.id);
    sendSuccess(res, "Current user fetched successfully", { user });
  };

  updateProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
    if (!req.user) throw new AppError("Unauthorized access", 401);
    const user = await this.service.updateProfile(req.user.id, req.body);
    sendSuccess(res, "Profile updated successfully", { user });
  };
}
