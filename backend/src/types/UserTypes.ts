import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string | null;
  refreshToken: string | null;
  googleId: string | null;
  githubId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  passwordChangedAt: Date | null;
  resetPasswordRequestedAt: Date | null;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "githubId"
  | "googleId"
  | "refreshToken"
  | "resetPasswordToken"
  | "resetPasswordExpires"
  | "passwordChangedAt"
  | "resetPasswordRequestedAt"
> {}

export interface UserCreateRequest {
  fullname: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface GithubLoginRequest {
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
}

export interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  accessToken: string;
}

export interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
