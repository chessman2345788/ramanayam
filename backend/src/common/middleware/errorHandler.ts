import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors";
import logger from "../../components/logger";

interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown = undefined;

  // ─── Custom operational errors ────────────────────────────────────
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // ─── Zod validation errors ───────────────────────────────────────
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    logger.error("Zod Validation Error:", { errors });
    console.error("=== ZOD VALIDATION ERROR ===", JSON.stringify(errors, null, 2));
  }

  // ─── Prisma: Unique constraint violation ───────────────────────────
  else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    statusCode = 409;
    message = "A record with this value already exists.";
  }

  // ─── Prisma: Record not found ──────────────────────────────────
  else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    statusCode = 404;
    message = "The requested resource was not found.";
  }

  // ─── JWT errors ───────────────────────────────────────────────
  else if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Authentication token has expired";
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid authentication token";
  }

  // ─── Unhandled / unexpected errors ───────────────────────────────
  else {
    logger.error("Unhandled Exception:", { message: err.message, stack: err.stack, url: req.originalUrl, method: req.method });
  }

  const responseBody: ErrorResponse = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    responseBody.errors = errors;
  }

  // Never expose stack traces in API responses — they are logged by Winston
  res.status(statusCode).json(responseBody);
};
