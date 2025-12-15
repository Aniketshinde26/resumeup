import { Request } from "express";

export interface JwtUser {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtUser;
}
