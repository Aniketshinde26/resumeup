import type { Resume } from "./templateindex";

//Success Messsage 
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; 
}

export interface FetchResumesResponse {
  message: string;
  count : number;
  resumes: Resume[];
  isGuest?: boolean;
}

