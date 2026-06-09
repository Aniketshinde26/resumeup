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
  resumes: any[]; 
  isGuest: boolean;
}>;

export type ResumeResponse = ApiResponse<{
  resume: any; 
}>;

export type GetAllCoverLettersResponse = ApiResponse<{
  count: number;
  coverletters: any[]; 
  isGuest: boolean;
}>;

export type CoverLetterResponse = ApiResponse<{
  coverletter: any; 
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
  user: any; // Or swap with your User instance type later
}>;

export type LoginUserResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  user: AuthUserPayload;
}>;

export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
}>;

// Endpoints that only return a message (like forgotPassword, resetPassword, logoutUser) 
// can completely share our existing generic ApiResponse type!
export type AuthMessageResponse = ApiResponse;