import type { Resume } from "./templateindex";


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

export type { ApiResponse, FetchResumesResponse, ResumeByIdResponse };
