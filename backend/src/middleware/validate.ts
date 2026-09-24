import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError } from "../utils/AppError";

type ValidateSource = "body" | "params";

export const validate = (
  schema: z.ZodTypeAny,
  source: ValidateSource = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(
      source === "params" ? req.params : req.body,
    );
    if (!result.success) {
      return next(
        new BadRequestError(
          result.error.issues[0]?.message || "Invalid request",
        ),
      );
    }
    next();
  };
};
