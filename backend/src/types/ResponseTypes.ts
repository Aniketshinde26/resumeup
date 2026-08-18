import { Resume, User } from "../models";
import Coverletter from "../models/Coverletter";

interface BaseSuccessResponse {
  success: true;
  message: string;
  accessToken?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export type ApiResponse<T = {}> = (BaseSuccessResponse & T) | ErrorResponse;

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

export type DeleteResponse = ApiResponse;

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
  user: AuthUserPayload;
}>;

export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
  user: AuthUserPayload;
}>;

export type AuthMessageResponse = ApiResponse;
