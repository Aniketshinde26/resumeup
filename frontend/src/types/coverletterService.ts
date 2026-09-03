import api from "../api/axios";
import type {
  CreateCoverLetterResponse,
  UpdateCoverLetterResponse,
  DeleteCoverLetterResponse,
  FetchCoverLettersResponse,
  CoverLetterByIdResponse,
} from "./api";
import type { CoverLetterData } from "./templateindex";

export interface CreateCoverLetterPayload {
  title: string;
  templateId: string;
  data: CoverLetterData | Record<string, never>;
}

export interface UpdateCoverLetterPayload {
  title?: string;
  templateId?: string;
  data?: CoverLetterData;
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
