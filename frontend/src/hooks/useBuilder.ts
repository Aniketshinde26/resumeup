import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import type { Resume } from "../types/templateindex";
import type { ResumeByIdResponse } from "../types/api";
import { createEmptyResumeData } from "../types/templateindex";
import { ResumeService } from "../types/resumeService";

const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null); // 🛡️ Tracks backend rate limits/errors

  const updateData = (newData: any) => {
    setIsDirty(true);
    setSaveError(null); // Clear errors when modifications continue
    setResume((prev: any) => ({
      ...prev,
      data: { ...prev.data, ...(newData.data || newData) },
    }));
  };

  const loadResume = useCallback(async () => {
    if (!id) return;
    
    // Recovery Failsafe: Check if there's an unsaved local backup from a sudden crash/power cut
    const emergencyBackup = localStorage.getItem(`emergency_backup_${id}`);
    if (emergencyBackup) {
      console.log("🎒 Recovering unsaved changes from emergency local storage.");
      setResume(JSON.parse(emergencyBackup));
      setIsDirty(true); 
      setLoading(false);
      return;
    }

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
      const data = await ResumeService.getResumeById(id);  
      const fetchedResume = data.resume;

      const rawData = typeof fetchedResume.data === "string" 
        ? JSON.parse(fetchedResume.data) 
        : fetchedResume.data;

      setResume({
        ...fetchedResume,
        data: { ...createEmptyResumeData(), ...rawData }
      });

      setLoading(false);
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log("⏳ [useBuilder]: 401 Caught. Holding loading layout for background token sync...");
        return;
      }
      console.error("Failed to load resume:", err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadResume();
  }, [id, loadResume]);

  // 🎯 DELIBERATE MANUAL SAVE BUTTON HANDLER (No background network activity)
  const handleSave = async () => {
    if (!resume || !resume.data || !id) return;
    if (!isDirty || saving) return;
    
    setSaveError(null);

    if (PUBLIC_TEMPLATES.includes(id as string)) {
      localStorage.setItem(`guest_resume_${id}`, JSON.stringify(resume));
      console.log("Progress saved locally to browser.");
      setIsDirty(false); 
      return;
    }
    
    try {
      setSaving(true);
      
      await api.put<ResumeByIdResponse>(`/resumes/${id}`, {
        title: resume.title,
        data: resume.data,
      });
      
      setIsDirty(false);
      localStorage.removeItem(`emergency_backup_${id}`); // Clear emergency backup on safe DB sync
    } catch (err: any) {
      if (err.response?.status === 429) {
  
        setSaveError(err.response?.data?.error || "You are saving documents too quickly. Please wait a moment.");
      } else {
        setSaveError("Failed to sync changes with the cloud. Please try again.");
      }
      console.error("Save failed details:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  // 🛡️ ACCIDENTAL EXIT GUARD: Prompts browser window overlay if changes are unsaved
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // 💾 LOCAL MIRRORING: Save to local cache on modification (Guards against crashes)
  useEffect(() => {
    if (!resume || !id || !isDirty || PUBLIC_TEMPLATES.includes(id)) return;
    localStorage.setItem(`emergency_backup_${id}`, JSON.stringify(resume));
  }, [resume, id, isDirty]);

  const updatePersonal = (field: string, value: string) => {
    setIsDirty(true);
    setSaveError(null);
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
    isDirty, tempImage, setTempImage, saveError
  };
};