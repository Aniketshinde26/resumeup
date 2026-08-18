import { Request } from "express";

export interface JwtUser {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtUser;
}

export interface JwtPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
