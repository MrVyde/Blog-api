import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";
import { errorMessages } from "../errors/errorMessages";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // App errors (your expected errors)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
        code: error.code,
        message:
        errorMessages[error.code] || "Something went wrong",
    });
    }

  // Unexpected errors
  return res.status(500).json({
    message: "Something went wrong. Please try again",
  });
};