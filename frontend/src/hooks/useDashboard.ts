import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Resume } from "../types/templateindex";
import { ResumeService } from "../types/resumeService";

export const useDashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0); 
  const navigate = useNavigate();

 
  /**
   * Navigates to the resume builder page for the given resume ID.
   * @param {string} id - The ID of the resume to edit.
   */
  const handleEditResume = (id: string) => {
    navigate(`/builder/${id}`);
  };
  
  /**
   * Handles the selection of a resume template and opens the creation modal.
   * @param {string} templateId - The ID of the selected template.
   */
    const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
  };
  /**
   * Creates a new resume with the given title, selected template, and empty data, then navigates to the builder page for the new resume.
   * @param {string} title - The title of the new resume.
   */
    const handleCreate = async (title: string) => {
    setIsLoading(true);
    try {
    
      const res = await ResumeService.createResume({
        title,
        templateId: selectedTemplate,
        data: {},
      });
      const newId = res.resume.id; 
      navigate(`/builder/${newId}`);
      
    } catch (err) {
      console.error("Creation failed", err);
      alert("Could not create resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Deletes a resume by its ID, updates the local state to remove the deleted resume, and decrements the resume count.
   * @param {string} id - The ID of the resume to delete.
   */

  const handleDeleteResume = async (id: string) => {
    try {
      await ResumeService.deleteResumeById(id); 
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      setCount((prev) => prev - 1);
      console.log("Resume deleted successfully");
    } catch (err) {
      console.error("Failed to delete resume", err);
      alert("Failed to delete resume. Please try again."); 
    } 
  };  
  
  /**
   * Fetches all resumes for the current user, updates the local state with the fetched resumes and count, and handles loading state.
   */
    const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 450));
      const res = await ResumeService.getAllResumes();
      await delay;
      setResumes(res.resumes|| []);
      setCount(res.count || 0);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return {
    resumes,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    handleTemplateSelect,
    handleCreate,
    handleEditResume, 
    handleDeleteResume,
    count, 
  };
};
