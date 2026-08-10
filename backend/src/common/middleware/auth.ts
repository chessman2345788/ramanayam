import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { verifyToken } from "../../components/auth";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized access. Token missing.", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token.", 401));
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return next(new AppError("Forbidden: Insufficient permissions.", 403));
    }
    next();
  };
};
