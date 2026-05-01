import api from "../api/axios";
import type { FetchResumesResponse, ResumeByIdResponse,  } from "./api";


/**
 * Fetches all resumes for the current user.
 * @returns {Promise<FetchResumesResponse>} An object containing the list of resumes, count, and an optional isGuest flag.
 * @throws Will throw an error if the API request fails.
 */
export const ResumeService = {
    getAllResumes: async (): Promise<FetchResumesResponse> => {
        const response = await api.get<FetchResumesResponse>("/resumes");
        return response.data;
    },

    getResumeById: async (id: string): Promise<ResumeByIdResponse> => {
        const response = await api.get<ResumeByIdResponse>(`/resumes/${id}`);
        return response.data;
    }
}




