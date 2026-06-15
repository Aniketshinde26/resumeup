import type { coverLetter, Resume } from "./templateindex";


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
  resume: Resume; 
}

interface FetchCoverLettersResponse {
  message: string;
  count : number;
  coverletters:coverLetter[];
  isGuest?: boolean;
}

interface CoverLetterByIdResponse {
  message: string;
  coverletter: coverLetter;
}

interface DeleteCoverLetterResponse {
  message: string;
}

interface CreateCoverLetterResponse {
  message: string;
  coverletter: coverLetter;
}



export type { ApiResponse, FetchResumesResponse, ResumeByIdResponse, DeleteResumeResponse, CreateResumeResponse, FetchCoverLettersResponse, CoverLetterByIdResponse, DeleteCoverLetterResponse, CreateCoverLetterResponse };
