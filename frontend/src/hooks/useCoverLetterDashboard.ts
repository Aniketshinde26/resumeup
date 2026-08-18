import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { CoverLetter } from "../types/templateindex";
import type {
  CreateCoverLetterResponse,
  DeleteCoverLetterResponse,
  FetchCoverLettersResponse,
} from "../types/api";

export const useCoverLetterDashboard = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCoverLetters = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<FetchCoverLettersResponse>("/cover-letters");
      setCoverLetters(res.data.coverletters || []);
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
      const res = await api.post<CreateCoverLetterResponse>("/cover-letters", {
        Title: title,
        TemplateId: selectedTemplate,
        Data: {},
      });
      const newId = res.data.coverletter?.Id || res.data.coverletter?.Id;
      if (!newId) {
        console.error(
          "CRITICAL: No ID returned from backend. Check the console log above.",
          res.data,
        );
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

  const handleDeleteCoverLetter = async (id: string) => {
    try {
      await api.delete<DeleteCoverLetterResponse>(`/cover-letters/${id}`);
      setCoverLetters((prev) => prev.filter((cl) => (cl.Id || cl.Id) !== id));
    } catch (err: unknown) {
      console.error("Deletion failed", err);
    }
  };

  const handleEditCoverLetter = (id: string | number) => {
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
