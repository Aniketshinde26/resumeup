import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import type { Resume } from "../types/templateindex";
import type { ResumeByIdResponse } from "../types/api";
import { createEmptyResumeData } from "../types/templateindex";
import {ResumeService} from "../types/resumeService";
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
    
    // Pass directly through your service layer and interceptor queue
    const data = await ResumeService.getResumeById(id);  
    const fetchedResume = data.resume;

    const rawData = typeof fetchedResume.data === "string" 
      ? JSON.parse(fetchedResume.data) 
      : fetchedResume.data;

    setResume({
      ...fetchedResume,
      data: { ...createEmptyResumeData(), ...rawData }
    });

    // 💡 ONLY turn off loading if the request succeeds completely
    setLoading(false);
    
  } catch (err: any) {
    // 🛡️ THE SAFETY SHIELD: If it's a 401, stay silent and keep the loading spinner running.
    // The axios response interceptor will automatically handle the retry underneath.
    if (err.response?.status === 401) {
      console.log("⏳ [useBuilder]: 401 Caught. Holding loading layout for background token sync...");
      return;
    }

    // Otherwise, handle actual unexpected API failures (like a 404 or 500 error)
    console.error("Failed to load resume:", err);
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    if (id) loadResume();
  }, [id, loadResume]);

  useEffect(() => {
    if (!resume || !resume.data || !id) return;
    if (!isDirty || saving) return; 
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
    localStorage.setItem(`guest_resume_${id}`, JSON.stringify(resume));
    console.log("Progress saved locally to browser.");
    setIsDirty(false); 
    return;
  }
  try {
    setSaving(true);
    
    // ✅ FIX: Move this to a clean PUT method in your ResumeService if you have one, 
    // or keep it safe by ensuring your custom axios.ts from the previous step is deployed.
    await api.put<ResumeByIdResponse>(`/resumes/${id}`, {
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

 const updatePersonal = (field: string, value: string) => {
  setIsDirty(true);
  
  setResume((prev) => {
    if (!prev) return null;

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