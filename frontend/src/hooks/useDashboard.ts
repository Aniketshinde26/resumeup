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
  setIsLoading(true); // Start the skeleton animation
  
  try {
    // 1. Create a "Minimum Delay" promise (e.g., 1000ms = 1 second)
    const delay = new Promise((resolve) => setTimeout(resolve, 450));

    // 2. Fetch the actual data
    const res = await api.get("/resumes");

    // 3. Wait for BOTH the data AND the timer to finish
    // This ensures the skeleton doesn't "flicker" if the internet is too fast
    await delay;

    setResumes(res.data.resume || []);
  } catch (err) {
    console.error("Failed to fetch resumes", err);
  } finally {
    setIsLoading(false); // Stop the skeleton animation
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
      setResumes((prev) => prev.filter((resume: any) => resume.id !== id));
      console.log("Resume deleted successfully");
    } catch (err) {
      console.error("Failed to delete resume", err);
      alert;
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
    handleDeleteResume,
  };
};
