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