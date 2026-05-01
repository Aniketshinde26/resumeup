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


export type { GetAllResumesResponse, resumeByIdResponse };