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


export type { GetAllResumesResponse, resumeByIdResponse, deleteResumeResponse, createResumeResponse };