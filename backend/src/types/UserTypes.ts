import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  refreshToken: string | null;
  googleId: string | null;
  githubId:string|null;
  createdAt?: Date; 
  updatedAt?: Date; 
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "githubId" | "googleId" | "refreshToken"> {}


export interface UserCreateRequest {
  fullname: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  accessToken: string;
}
