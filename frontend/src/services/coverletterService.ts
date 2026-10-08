import api from "../api/axios";
import type {
  FetchCoverLettersResponse,
  CoverLetterByIdResponse,
  CreateCoverLetterResponse,
  UpdateCoverLetterResponse,
  DeleteCoverLetterResponse,
} from "../types/api";
import type { CoverLetterData } from "../types/templateindex";

export interface CreateCoverLetterPayload {
  Title: string;
  TemplateId: string;
  Data: CoverLetterData | Record<string, never>;
}

export interface UpdateCoverLetterPayload {
  Title?: string;
  TemplateId?: string;
  Data?: CoverLetterData;
}

export const CoverLetterService = {
  getAllCoverLetters: async (): Promise<FetchCoverLettersResponse> => {
    const response = await api.get<FetchCoverLettersResponse>("/cover-letters");
    return response.data;
  },

  getCoverLetterById: async (
    id: number,
  ): Promise<CoverLetterByIdResponse> => {
    const response = await api.get<CoverLetterByIdResponse>(
      `/cover-letters/${id}`,
    );
    return response.data;
  },

  createCoverLetter: async (
    payload: CreateCoverLetterPayload,
  ): Promise<CreateCoverLetterResponse> => {
    const response = await api.post<CreateCoverLetterResponse>(
      "/cover-letters",
      payload,
    );
    return response.data;
  },

  updateCoverLetter: async (
    id: number,
    payload: UpdateCoverLetterPayload,
  ): Promise<UpdateCoverLetterResponse> => {
    const response = await api.put<UpdateCoverLetterResponse>(
      `/cover-letters/${id}`,
      payload,
    );
    return response.data;
  },

  deleteCoverLetterById: async (
    id: number,
  ): Promise<DeleteCoverLetterResponse> => {
    const response = await api.delete<DeleteCoverLetterResponse>(
      `/cover-letters/${id}`,
    );
    return response.data;
  },
};
