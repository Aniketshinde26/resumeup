import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  console.error("Unhandled System Error:", err);

  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction
    ? "Internal Server Error"
    : err instanceof Error
      ? err.message
      : "Internal Server Error";

  res.status(500).json({
    success: false,
    message,
  });
};
