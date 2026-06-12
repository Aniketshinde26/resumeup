import { Resume, User } from "../models";
import Coverletter from "../models/Coverletter";

// Core blueprints for all responses
interface BaseSuccessResponse {
  success: true;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string; 
}

// Generic Wrapper that automatically bridges success and error states
export type ApiResponse<T = {}> = (BaseSuccessResponse & T) | ErrorResponse;


// --- Explicit Response Shapes ---

export type GetAllResumesResponse = ApiResponse<{
  count: number;
  resumes: Resume[]; 
  isGuest: boolean;
}>;

export type ResumeResponse = ApiResponse<{
  resume: Resume;
}>;

export type GetAllCoverLettersResponse = ApiResponse<{
  count: number;
  coverletters: Coverletter[]; 
  isGuest: boolean;
}>;

export type CoverLetterResponse = ApiResponse<{
  coverletter: Coverletter; 
}>;

// Shares generic structure since deletions just return success & message
export type DeleteResponse = ApiResponse;

// --- Authentication Payloads ---
interface AuthUserPayload {
  id: number;
  email: string;
  fullname: string;
  picture?: string;

}

export type RegisterUserResponse = ApiResponse<{
  user: {
    id: number;
    fullname: string;
    email: string;
  };
}>;

export type LoginUserResponse = ApiResponse<{
  accessToken: string;
 
  user: AuthUserPayload;
}>;

export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
}>;

export type AuthMessageResponse = ApiResponse;
