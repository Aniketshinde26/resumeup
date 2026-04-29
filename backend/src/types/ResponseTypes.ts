interface GetAllResumesResponse {
  message: string;
  count: number;
  resumes: any[]; // Or use your Resume Model type
  isGuest: boolean;
}

export type { GetAllResumesResponse };