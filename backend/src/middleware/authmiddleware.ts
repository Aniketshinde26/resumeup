import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

// src/middleware/authmiddleware.ts

export const optionalToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  // 1. Truly no token? Fine, proceed as a guest.
  if (!token) {
    return next(); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    // 2. If a token EXISTS but is EXPIRED, we MUST return a 401.
    // This is the only way to trigger your Frontend's Refresh logic!
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please refresh" });
    }

    // 3. If it's just a garbage/invalid token, treat as guest or 401.
    // Usually, next() is fine here, or a 401 if you want to be strict.
    next(); 
  }
};