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

  const handleEditResume = (id: number) => {
    navigate(`/builder/${id}`);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
  };
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
    } catch (err: unknown) {
      console.error("Creation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (id: number) => {
    try {
      await ResumeService.deleteResumeById(id);
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      setCount((prev) => prev - 1);
    } catch (err: unknown) {
      console.error("Failed to delete resume", err);
    }
  };

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const res = await ResumeService.getAllResumes();
      setResumes(res.resumes || []);
      setCount(res.count || 0);
    } catch (err: unknown) {
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
