import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const updateData = (newData: any) => {
    setIsDirty(true);
    setResume((prev: any) => ({
      ...prev,

      data: { ...prev.data, ...(newData.data || newData) },
    }));
  };

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
      if (!fetchedResume.data.projects) fetchedResume.data.projects = [];
      if (!fetchedResume.data.languages) fetchedResume.data.languages = [];
      if (!fetchedResume.data.certifications)
        fetchedResume.data.certifications = [];

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

  useEffect(() => {
    // 1. ADD THIS GUARD: If resume is null, stop here.
    if (!resume || !resume.data) return;

    // 2. Existing guards
    if (!isDirty || saving) return;

    const timer = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(timer);

    // Added resume.data to ensure we catch the latest changes
  }, [isDirty, resume?.data, saving, resume]);

  // 2. Update local state (when user types)

  // 3. Save to Database
  const handleSave = async () => {
    // 1. SAFETY GUARD: If resume hasn't loaded yet, stop immediately
    if (!resume || !resume.data) return;

    // 2. LOGIC GUARD: If nothing changed or already saving, stop
    if (!isDirty || saving) return;

    try {
      setSaving(true);

      // 3. The Request
      await api.put(`/resumes/${id}`, {
        title: resume.title,
        data: resume.data, // This is now safe because of the guard above
      });

      setIsDirty(false);
    } catch (err: any) {
      console.error("Save failed details:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };
  //  The "Exit Warning" Effect
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();

        (event as any).returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
  // Helper to update nested personal data
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
  // Updated Image upload using the internal updatePersonal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImage(reader.result as string);
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
    isDirty,
    tempImage,
    setTempImage,
  };
};
