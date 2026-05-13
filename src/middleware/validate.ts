import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
        new AppError(
        errors.array()[0]?.msg || "VALIDATION_ERROR",
        400
        )
    );
   }

  next();
};