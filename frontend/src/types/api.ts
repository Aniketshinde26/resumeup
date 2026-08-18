import type { CoverLetter, Resume } from "./templateindex";

export interface BaseApiResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> extends BaseApiResponse {
  data: T;
}

export type MessageResponse = BaseApiResponse;

export interface FetchResumesResponse extends BaseApiResponse {
  count: number;
  resumes: Resume[];
  isGuest?: boolean;
}

export interface ResumeByIdResponse extends BaseApiResponse {
  resume: Resume;
}

export interface CreateResumeResponse extends BaseApiResponse {
  resume: Resume;
}

export interface UpdateResumeResponse extends BaseApiResponse {
  resume: Resume;
}

export type DeleteResumeResponse = BaseApiResponse;

export interface FetchCoverLettersResponse extends BaseApiResponse {
  count: number;
  coverletters: CoverLetter[];
  isGuest?: boolean;
}

export interface CoverLetterByIdResponse extends BaseApiResponse {
  coverletter: CoverLetter;
}

export interface CreateCoverLetterResponse extends BaseApiResponse {
  coverletter: CoverLetter;
}

export interface UpdateCoverLetterResponse extends BaseApiResponse {
  coverletter: CoverLetter;
}

export type DeleteCoverLetterResponse = BaseApiResponse;

export interface GoogleCredentialResponse {
  credential: string;
}

export interface ForgotPasswordResponse extends BaseApiResponse {}
