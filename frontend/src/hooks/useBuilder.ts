import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Fetch the resume data on load
  const loadResume = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/resumes/${id}`);
      setResume(res.data.resume);
    } catch (err) {
      console.error("Failed to load resume", err);
      navigate("/dashboard"); // Redirect if resume doesn't exist
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  // 2. Update local state (when user types)
  const updateData = (newData: any) => {
    setResume((prev: any) => ({
      ...prev,
      data: { ...prev.data, ...newData },
    }));
  };

  // 3. Save to Database
  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put(`/resumes/${id}`, {
        title: resume.title,
        data: resume.data,
      });
      console.log("Saved successfully");
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  return {
    resume,
    loading,
    saving,
    updateData,
    handleSave,
  };
};
