import api from "../api/axios";
import type { FetchResumesResponse, ResumeByIdResponse,DeleteResumeResponse, CreateResumeResponse  } from "./api";
import type { ResumeData } from "./templateindex";



/**
 * Fetches all resumes for the current user.
 * @returns {Promise<FetchResumesResponse>} An object containing the list of resumes, count, and an optional isGuest flag.
 * @throws Will throw an error if the API request fails.
 */
export const ResumeService = {
    /**
     * @returns {Promise<FetchResumesResponse>} An object containing the list of resumes, count, and an optional isGuest flag.
     * @throws Will throw an error if the API request fails.    
     */
    getAllResumes: async (): Promise<FetchResumesResponse> => {
        const response = await api.get<FetchResumesResponse>("/resumes");
        return response.data;
    },

    /**
     * Fetches a single resume by its ID.
     * @param {string} id - The ID of the resume to fetch.
     * @returns {Promise<ResumeByIdResponse>} An object containing the resume data.
     * @throws Will throw an error if the API request fails.    
     */
    getResumeById: async (id: string): Promise<ResumeByIdResponse> => {
        const response = await api.get<ResumeByIdResponse>(`/resumes/${id}`);
        return response.data;
    },

    /**
     * Deletes a resume by its ID.
     * @param {string} id - The ID of the resume to delete.
     * @returns {Promise<DeleteResumeResponse>} An object containing a success message.
     * @throws Will throw an error if the API request fails.    
     */
    deleteResumeById: async (id: string): Promise<DeleteResumeResponse> => {
        const response = await api.delete<DeleteResumeResponse>(`/resumes/${id}`);
        return response.data;
    },

        /**     
         * Creates a new resume with the given title, template ID, and data.
         * @param {Object} payload - The data for the new resume.
         * @param {string} payload.title - The title of the new resume.
         * @param {string} payload.templateId - The ID of the template to use for the new resume.
         * @param {any} payload.data - The initial data for the new resume.
         * @returns {Promise<CreateResumeResponse>} An object containing a success message and the created resume data.
         * @throws Will throw an error if the API request fails.    
         */
    createResume: async (payload: { title: string; templateId: string; data: ResumeData |Record<string, never>; }): Promise<CreateResumeResponse> => {
        const response = await api.post<CreateResumeResponse>("/resumes", payload);
        return response.data;
    },      

}




