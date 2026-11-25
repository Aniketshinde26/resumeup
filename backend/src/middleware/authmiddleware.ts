import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import User from "../models/User";
import { JwtPayload } from "../types/auth";
import { UnauthorizedError } from "../utils/AppError";

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    next(new UnauthorizedError("Access denied, no token provided"));
    return;
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
  } catch (err: unknown) {
    if (err instanceof TokenExpiredError) {
      next(new UnauthorizedError("Token expired"));
      return;
    }
    next(new UnauthorizedError("Invalid token"));
    return;
  }

  try {
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "tokenVersion"],
    });
    const tokenVersion =
      typeof decoded.tokenVersion === "number" ? decoded.tokenVersion : 0;

    if (!user || user.tokenVersion !== tokenVersion) {
      next(new UnauthorizedError("Session has ended, please log in again"));
      return;
    }
  } catch (err: unknown) {
    next(err);
    return;
  }

  req.user = decoded;
  next();
};
