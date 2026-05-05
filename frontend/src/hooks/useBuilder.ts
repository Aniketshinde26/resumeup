import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { createEmptyResumeData, type Resume, type ResumeData, type createEmptyResume } from "../types/templateindex";
import type { ResumeByIdResponse } from "../types/api";


const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();
 

  const [resume, setResume] = useState<Resume | null>(null);
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
        data: createEmptyResumeData()
      };
      setResume(guestResume);
      setLoading(false);
      return; 
    }

    try {
      setLoading(true);
      const res = await api.get<ResumeByIdResponse>(`/resumes/${id}`);  
      const fetchedResume = res.data.resume;

    const rawData = typeof fetchedResume.data === "string" 
    ? JSON.parse(fetchedResume.data) 
    : fetchedResume.data;

  setResume({
    ...fetchedResume,
    data: { ...createEmptyResumeData(), ...rawData }
  });

      
    } catch (err) {
      console.error("Failed to load resume:", err);
    }finally {
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
  if (PUBLIC_TEMPLATES.includes(id as string)) {
    // 1. Save to localStorage instead of the database
    localStorage.setItem(`guest_resume_${id}`, JSON.stringify(resume));
    
    // 2. Show a "Draft Saved" toast or message instead of redirecting
    console.log("Progress saved locally to browser.");
    setIsDirty(false); 
    
    // 3. Optional: Show a subtle non-blocking hint
    // setInfoMessage("Progress saved to browser. Create an account to access this on any device!");
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
  
  setResume((prev) => {
    // 1. Guard Clause: If there's no resume, we can't update it.
    if (!prev) return null;

    // 2. Return the full object, ensuring 'id' and other root properties remain intact
    return {
      ...prev,
      data: {
        ...prev.data,
        personal: { 
          ...prev.data.personal, 
          [field]: value 
        },
      },
    };
  });
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