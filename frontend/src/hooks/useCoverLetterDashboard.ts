import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { CoverLetter } from "../types/templateindex";

export const useCoverLetterDashboard = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");   
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const navigate = useNavigate();   

  const handleEditCoverLetter = (id: string) => {
    navigate(`/cover-letter/builder/${id}`);
  };

  const fetchCoverLetters = async () => {
    setIsLoading(true);
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 450));
        const res = await api.get("/cover-letters");
        await delay;
        setCoverLetters(res.data.coverLetters || []);
    } catch (err) {
      console.error("Failed to fetch cover letters", err);
    } finally {
      setIsLoading(false);
    }
    };

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId);
        setIsModalOpen(true);

    };

    const handleCreateCoverLetter = async (Title: string) => {
        setIsLoading(true);
        try {
          const res = await api.post("/cover-letters", {
            Title,
            TemplateId: selectedTemplate,
            Data: {},
          });
          const newId = res.data.coverLetter?.id || res.data.id;
          navigate(`/cover-letter-builder/${newId}`);
        } catch (err) {
          console.error("Creation failed", err);
        } finally {
          setIsLoading(false);
        } 
      };

      const handleDeleteCoverLetter = async (id: string) => {
        try {
          await api.delete(`/cover-letters/${id}`); 
          setCoverLetters((prev) => prev.filter((cl) => cl.id !== id));
        } catch (err) {
          console.error("Deletion failed", err);
        } 
      };

     
    return{
        coverLetters,
        isLoading,
        handleEditCoverLetter,
        fetchCoverLetters,
        selectedTemplate,
        isModalOpen,
        handleTemplateSelect,
        handleCreateCoverLetter,
        handleDeleteCoverLetter,
        setIsModalOpen
    };
};