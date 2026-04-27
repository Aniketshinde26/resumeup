// The generic 'T' is the data you actually care about
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; 
}