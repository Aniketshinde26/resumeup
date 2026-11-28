import { Request } from "express";

export interface JwtUser {
  id: number;
  email: string;
  tokenVersion?: number;
}

export interface JwtPayload {
  id: number;
  email: string;
  tokenVersion?: number;
}

export interface AuthRequest extends Request {
  user?: JwtUser;
}

export interface GoogleLoginRequestBody {
  id_token?: string;
  google_access_token?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
