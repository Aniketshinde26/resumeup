import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { CoverLetter } from "../types/templateindex";

export const useCoverLetterBuilder = () => {
  // 1. Rename to plural for clarity
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditCoverLetter = (id: string) => {
    navigate(`/cover-letter-builder/${id}`);
  };

  const fetchCoverLetter = async () => {
    setIsLoading(true);
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 450));
      const res = await api.get("/cover-letter");
      await delay;
      // Ensure we set the array correctly
      setCoverLetters(res.data.coverLetter || []);
    } catch (err) {
      console.error("Failed to fetch cover letter", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverLetter();
  }, []);

  const handleCoverTemplateSelect = (TemplateId: string) => {
    setSelectedTemplate(TemplateId);
    setIsModalOpen(true);
  };

  const handleCreateCoverLetter = async (Title: string) => {
    setIsLoading(true);
    try {
      const res = await api.post("/cover-letter", {
        Title,
        TemplateId: selectedTemplate,
        Data: {},
      });
      const newId = res.data.coverLetter?.id || res.data.id;
     navigate(`/cover-letter/builder/${newId}`);
    } catch (err) {
      console.error("Failed to create cover letter", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoverLetter = async (id: string) => {
    try {
      await api.delete(`/cover-letter/${id}`);
      // Works perfectly now because of the interface
      setCoverLetters((prev) => prev.filter((cl) => cl.id !== id));
      console.log("Cover letter deleted successfully");
    } catch (err) {
      console.error("Failed to delete cover letter", err);
      alert("Failed to delete cover letter. Please try again."); // Fixed alert
    }
  };

  return {
    coverLetters, // plural
    isLoading,
    isModalOpen, // Added this
    setIsModalOpen, // Added this
    handleEditCoverLetter,
    handleCoverTemplateSelect,
    handleCreateCoverLetter,
    handleDeleteCoverLetter,
  };
};
