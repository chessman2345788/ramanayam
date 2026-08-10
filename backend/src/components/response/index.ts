import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data: any = null,
  statusCode = 200,
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  errors: any = null,
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
