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
}
//Giving an id to keep few fields optional
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "githubId" | "googleId" | "refreshToken"> {}

//Request
export interface UserCreateRequest {
  fullname: string;
  email: string;
  password: string;
}
//Response
export interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  accessToken: string;
}
