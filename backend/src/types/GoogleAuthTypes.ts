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

export interface GoogleLoginRequestBody {
  id_token?: string;
  google_access_token?: string;
}

export interface GoogleLoginRequest extends Request {
  body: GoogleLoginRequestBody;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
