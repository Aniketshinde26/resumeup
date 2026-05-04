import type { CoverLetter, Resume } from "./templateindex";


 interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; 
}

 interface FetchResumesResponse {
  message: string;
  count : number;
  resumes: Resume[];
  isGuest?: boolean;
}

 interface ResumeByIdResponse {
  message: string;
  resume: Resume;
}

interface DeleteResumeResponse {
  message: string;
}

interface CreateResumeResponse {
  message: string;
  resume: Resume; // This is the key that was missing!
}

interface FetchCoverLettersResponse {
  message: string;
  count : number;
  coverLetters: CoverLetter[];
  isGuest?: boolean;
}

interface CoverLetterByIdResponse {
  message: string;
  coverLetter: CoverLetter;
}

interface DeleteCoverLetterResponse {
  message: string;
}

interface CreateCoverLetterResponse {
  message: string;
  coverLetter: CoverLetter;
}



export type { ApiResponse, FetchResumesResponse, ResumeByIdResponse, DeleteResumeResponse, CreateResumeResponse, FetchCoverLettersResponse, CoverLetterByIdResponse, DeleteCoverLetterResponse, CreateCoverLetterResponse };
