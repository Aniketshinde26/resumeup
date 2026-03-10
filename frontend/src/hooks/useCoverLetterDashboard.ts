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

const handleCreateCoverLetter = async (title: string) => {
    setIsLoading(true);
    try {
        const res = await api.post("/cover-letters", {
            Title: title,
            TemplateId: selectedTemplate,
            Data: {},
        });

        // 1. Log this so you can see exactly what your DB sent back
        console.log("DEBUG: Backend response data:", res.data);

        // 2. Try every possible way the ID might be named
        const newId = 
            res.data.coverLetter?.id || 
            res.data.coverLetter?.Id || 
            res.data.id || 
            res.data.Id;

        if (!newId) {
            console.error("CRITICAL: No ID returned from backend. Check the console log above.");
            return; 
        }

        // 3. Only navigate if newId actually exists
        navigate(`/cover-letter-builder/${newId}`);
        setIsModalOpen(false);

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