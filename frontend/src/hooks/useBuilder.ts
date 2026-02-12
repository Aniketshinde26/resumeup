import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const updateData = (newData: any) => {
    setIsDirty(true);
    setResume((prev: any) => ({
      ...prev,
      data: { ...prev.data, ...(newData.data || newData) },
    }));
  };

  const loadResume = useCallback(async () => {
    if (!id) return;

    // 1. Fixed the TypeScript error by casting 'id as string'
    if (PUBLIC_TEMPLATES.includes(id as string)) {
      console.log("Guest Mode: Loading template structure for", id);
      const guestResume = {
        id: id,
        title: id === "moderntech" ? "Modern Tech Resume" : "Professional Resume",
        templateId: id,
        data: {
         
        },
      };
      setResume(guestResume);
      setLoading(false);
      return; 
    }

    try {
      setLoading(true);
      const res = await api.get(`/resumes/${id}`);
      const fetchedResume = res.data.resume || res.data;

      if (typeof fetchedResume.data === "string") {
        try {
          fetchedResume.data = JSON.parse(fetchedResume.data);
        } catch (e) {
          console.error("Failed to parse resume data string", e);
          fetchedResume.data = {};
        }
      }

      // Ensure nested objects exist
      if (!fetchedResume.data) fetchedResume.data = {};
      const fields = ['personal', 'experience', 'education', 'skills', 'projects', 'languages', 'certifications'];
      fields.forEach(field => {
        if (!fetchedResume.data[field]) {
           fetchedResume.data[field] = field === 'personal' ? {} : [];
        }
      });

      setResume(fetchedResume);
    } catch (err) {
      console.error("Failed to load resume:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadResume();
  }, [id, loadResume]);

  // Auto-save logic
  useEffect(() => {
    if (!resume || !resume.data || !id) return;
    if (!isDirty || saving) return;
    
    // 2. Prevent auto-save for guests
    if (PUBLIC_TEMPLATES.includes(id as string)) return;

    const timer = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isDirty, resume?.data, saving, resume, id]);

  const handleSave = async () => {
    if (!resume || !resume.data || !id) return;
    if (!isDirty || saving) return;

    // 3. Block manual save for guests
    if (PUBLIC_TEMPLATES.includes(id as string)) {
      console.log("Guest Mode: Save disabled");
      return;
    }

    try {
      setSaving(true);
      await api.put(`/resumes/${id}`, {
        title: resume.title,
        data: resume.data,
      });
      setIsDirty(false);
    } catch (err: any) {
      console.error("Save failed details:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  // Rest of your helpers...
  const updatePersonal = (field: string, value: string) => {
    setIsDirty(true);
    setResume((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        personal: { ...prev.data.personal, [field]: value },
      },
    }));
  };



const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {

    const previewUrl = URL.createObjectURL(file);
    
   
    updatePersonal("profileImage", previewUrl);
  }
};

  return {
    resume, loading, saving, updateData, handleSave, 
    handleFileChange, updatePersonal, loadResume, 
    isDirty, tempImage, setTempImage,
  };
};