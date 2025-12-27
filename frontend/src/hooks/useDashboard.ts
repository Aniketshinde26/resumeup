import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const useDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEditReume = (id: string) => {
    navigate(`/builder/${id}`);
  };
  // Fetch all resumes on load
  const fetchResumes = async () => {
    try {
      const res = await api.get("/resumes");
      // Adjust based on your backend response structure
      setResumes(res.data.resume || []);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
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

  return {
    resumes,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    handleTemplateSelect,
    handleCreate,
    handleEditReume,
  };
};
