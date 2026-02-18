import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Resume } from "../types/templateindex";

export const useDashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Renamed for clarity: handleEditResume
  const handleEditResume = (id: string) => {
    navigate(`/builder/${id}`);
  };

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 450));
      const res = await api.get("/resumes");
      await delay;
      setResumes(res.data.resumes || []);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
  };

  const handleCreate = async (title: string) => {
    setIsLoading(true);
    try {
      const res = await api.post("/resumes", {
        title,
        templateId: selectedTemplate,
        data: {},
      });

      const newId = res.data.resume?.id || res.data.id;
      navigate(`/builder/${newId}`);
    } catch (err) {
      console.error("Creation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (id: string) => {
    try {
      await api.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      console.log("Resume deleted successfully");
    } catch (err) {
      console.error("Failed to delete resume", err);
      alert("Failed to delete resume. Please try again."); // Fixed function call
    }
  };

  return {
    resumes,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    handleTemplateSelect,
    handleCreate,
    handleEditResume, 
    handleDeleteResume,
  };
};