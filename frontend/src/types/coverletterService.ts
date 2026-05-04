import api from "../api/axios";
import type { CreateCoverLetterResponse, DeleteCoverLetterResponse, FetchCoverLettersResponse, CoverLetterByIdResponse } from "./api";
import type { CoverLetterData } from "./templateindex";


export const CoverLetterService = {

    /**
     * Fetches all cover letters for the current user.
     * @returns {Promise<FetchCoverLettersResponse>} An object containing the list of cover letters, count, and an optional isGuest flag.
     * @throws Will throw an error if the API request fails.    
     */
    getAllCoverLetters: async (): Promise<FetchCoverLettersResponse> => {
        const response = await api.get<FetchCoverLettersResponse>("/coverletters");
        return response.data;
    },

    /**
     * Fetches a cover letter by its ID.
     * @param {string} id - The ID of the cover letter to fetch.
     * @returns {Promise<CoverLetterByIdResponse>} An object containing the fetched cover letter.
     * @throws Will throw an error if the API request fails.
     */
    getCoverLetterById: async (id: string): Promise<CoverLetterByIdResponse> => {
        const response = await api.get<CoverLetterByIdResponse>(`/coverletters/${id}`);
        return response.data;
    },

    /**
     * Deletes a cover letter by its ID.
     * @param {string} id - The ID of the cover letter to delete.
     * @returns {Promise<DeleteCoverLetterResponse>} An object containing the result of the deletion.
     * @throws Will throw an error if the API request fails.
     */
    deleteCoverLetterById: async (id: string): Promise<DeleteCoverLetterResponse> => {
        const response = await api.delete<DeleteCoverLetterResponse>(`/coverletters/${id}`);
        return response.data;
    },

    /**
     * Creates a new cover letter.
     * @param {Object} payload - The data for the new cover letter.
     * @returns {Promise<CreateCoverLetterResponse>} An object containing the created cover letter.
     * @throws Will throw an error if the API request fails.
     */
    createCoverLetter: async (payload: { title: string; templateId: string; data: CoverLetterData | Record<string, never>; }): Promise<CreateCoverLetterResponse> => {
        const response = await api.post<CreateCoverLetterResponse>("/coverletters", payload);
        return response.data;
    },
}
