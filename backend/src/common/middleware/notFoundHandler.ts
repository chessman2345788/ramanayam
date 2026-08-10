import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import logger from "../../components/logger";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  next(new AppError("The requested resource was not found", 404));
};
