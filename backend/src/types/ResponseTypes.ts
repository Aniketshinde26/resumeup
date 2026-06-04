interface GetAllResumesResponse {
  message: string;
  count: number;
  resumes: any[]; 
  isGuest: boolean;
}

interface resumeByIdResponse {
  message: string;
  resume: any; 
}

interface deleteResumeResponse {
  message: string;
}

interface createResumeResponse {
  message: string;
  resume: any; 
}

interface createCoverLetterResponse {
  message: string;
  coverletter: any; 
}

interface getAllCoverLettersResponse {
  success: true;
  message: string;
  count: number;
  coverletters: any[]; 
  isGuest: boolean;
}
interface ErrorResponse {
  success: false;
  message: string;
  error?: string; 
}

interface deleteCoverLetterResponse {
  message: string;
}

interface coverLetterByIdResponse {
  message: string;
  coverletter: any;
}


export type { GetAllResumesResponse, resumeByIdResponse, deleteResumeResponse, createResumeResponse, createCoverLetterResponse, getAllCoverLettersResponse, deleteCoverLetterResponse, coverLetterByIdResponse, ErrorResponse };