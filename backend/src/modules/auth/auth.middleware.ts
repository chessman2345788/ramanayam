import { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors";
import { verifyAccessToken } from "./auth.utils";
import { RequestWithUser } from "./auth.types";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication token is missing or invalid", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    (req as RequestWithUser).user = decoded;
    next();
  } catch {
    next(new AppError("Invalid or expired authentication token", 401));
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as RequestWithUser).user;
    if (!user || !roles.includes(user.role)) {
      return next(
        new AppError("Forbidden: You do not have permission to access this resource", 403),
      );
    }
    next();
  };
};
