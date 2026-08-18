import api from "../api/axios";
import type {
  FetchResumesResponse,
  ResumeByIdResponse,
  DeleteResumeResponse,
  CreateResumeResponse,
  UpdateResumeResponse,
} from "./api";
import type { ResumeData } from "./templateindex";

export interface CreateResumePayload {
  title: string;
  templateId: string;
  data: ResumeData | Record<string, never>;
}

export interface UpdateResumePayload {
  title?: string;
  templateId?: string;
  data?: ResumeData;
}

export const ResumeService = {
  getAllResumes: async (): Promise<FetchResumesResponse> => {
    const response = await api.get<FetchResumesResponse>("/resumes");
    return response.data;
  },

  getResumeById: async (id: string | number): Promise<ResumeByIdResponse> => {
    const response = await api.get<ResumeByIdResponse>(`/resumes/${id}`);
    return response.data;
  },

  createResume: async (
    payload: CreateResumePayload,
  ): Promise<CreateResumeResponse> => {
    const response = await api.post<CreateResumeResponse>("/resumes", payload);
    return response.data;
  },

  updateResume: async (
    id: string | number,
    payload: UpdateResumePayload,
  ): Promise<UpdateResumeResponse> => {
    const response = await api.put<UpdateResumeResponse>(
      `/resumes/${id}`,
      payload,
    );
    return response.data;
  },

  deleteResumeById: async (
    id: string | number,
  ): Promise<DeleteResumeResponse> => {
    const response = await api.delete<DeleteResumeResponse>(`/resumes/${id}`);
    return response.data;
  },
};
