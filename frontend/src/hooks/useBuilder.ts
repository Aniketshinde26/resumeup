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
    if (!id) return;

    try {
      setLoading(true);
      const res = await api.get(`/resumes/${id}`);

      // 1. Get the resume object
      const fetchedResume = res.data.resume || res.data;

      // 2. CRITICAL FIX: If 'data' is a string, turn it into an object
      if (typeof fetchedResume.data === "string") {
        try {
          fetchedResume.data = JSON.parse(fetchedResume.data);
        } catch (e) {
          console.error("Failed to parse resume data string", e);
          fetchedResume.data = {}; // Fallback if string is totally broken
        }
      }

      // 3. Ensure nested objects exist so the UI doesn't crash
      if (!fetchedResume.data) fetchedResume.data = {};
      if (!fetchedResume.data.personal) fetchedResume.data.personal = {};
      if (!fetchedResume.data.experience) fetchedResume.data.experience = [];
      if (!fetchedResume.data.education) fetchedResume.data.education = [];
      if (!fetchedResume.data.skills) fetchedResume.data.skills = [];

      setResume(fetchedResume);
    } catch (err) {
      console.error("Failed to load resume:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // 🔥 THIS WAS MISSING: The "Trigger" that runs the code on page load
  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id, loadResume]);

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

  // Helper to update nested personal data
  const updatePersonal = (field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        personal: { ...prev.data.personal, [field]: value },
      },
    }));
  };
  // Updated Image upload using the internal updatePersonal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/"))
        return alert("Please upload an image file");

      const reader = new FileReader();
      reader.onloadend = () => {
        // ✅ Now it calls the helper defined above
        updatePersonal("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return {
    resume,
    loading,
    saving,
    updateData,
    handleSave,
    handleFileChange,
    updatePersonal,
    loadResume,
  };
};
