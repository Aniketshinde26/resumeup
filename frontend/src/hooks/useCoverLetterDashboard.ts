import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoverLetterService } from "../services/coverletterService";
import type { CoverLetter } from "../types/templateindex";

export const useCoverLetterDashboard = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCoverLetters = async () => {
    setIsLoading(true);
    try {
      const data = await CoverLetterService.getAllCoverLetters();
      setCoverLetters(data.coverletters || []);
    } catch (err: unknown) {
      console.error("Failed to fetch", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverLetters();
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
  };

  const handleCreateCoverLetter = async (title: string) => {
    setIsLoading(true);
    try {
      const data = await CoverLetterService.createCoverLetter({
        Title: title,
        TemplateId: selectedTemplate,
        Data: {},
      });
      const newId = data.coverletter?.Id;
      if (!newId) {
        console.error("No ID returned from backend.", data);
        return;
      }

      navigate(`/cover-letter-builder/${newId}`);
      setIsModalOpen(false);
    } catch (err: unknown) {
      console.error("Creation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoverLetter = async (id: number) => {
    try {
      await CoverLetterService.deleteCoverLetterById(id);
      setCoverLetters((prev) => prev.filter((cl) => cl.Id !== id));
    } catch (err: unknown) {
      console.error("Deletion failed", err);
    }
  };

  const handleEditCoverLetter = (id: number) => {
    if (!id) {
      console.error("No ID provided for editing");
      return;
    }
    navigate(`/cover-letter-builder/${id}`);
  };

  return {
    coverLetters,
    isLoading,
    handleEditCoverLetter,
    fetchCoverLetters,
    selectedTemplate,
    isModalOpen,
    handleTemplateSelect,
    handleCreateCoverLetter,
    handleDeleteCoverLetter,
    setIsModalOpen,
  };
};
