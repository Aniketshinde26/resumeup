import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Resume, ResumeData } from "../types/templateindex";
import {
  createEmptyResumeData,
  createEmptyResume,
} from "../types/templateindex";
import { ResumeService } from "../types/resumeService";

const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

export const useBuilder = () => {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateData = (newData: Partial<ResumeData>) => {
    setIsDirty(true);
    setSaveError(null);
    setResume((prev: Resume | null) => {
      if (!prev) return null;
      return {
        ...prev,
        data: { ...prev.data, ...newData },
      };
    });
  };

  const loadResume = useCallback(async () => {
    if (!id) return;

    if (PUBLIC_TEMPLATES.includes(id)) {
      const guestResume = localStorage.getItem(`guest_resume_${id}`);
      const defaultTitle =
        id === "moderntech" ? "Modern Tech Resume" : "Professional Resume";

      if (guestResume) {
        try {
          const parsed = JSON.parse(guestResume);
          setResume({
            ...parsed,
            data: { ...createEmptyResumeData(), ...(parsed.data || {}) },
          });
        } catch {
          setResume(createEmptyResume(id, defaultTitle, id));
        }
      } else {
        setResume(createEmptyResume(id, defaultTitle, id));
      }

      setLoading(false);
      return;
    }

    const emergencyBackup = localStorage.getItem(`emergency_backup_${id}`);
    if (emergencyBackup) {
      setResume(JSON.parse(emergencyBackup));
      setIsDirty(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await ResumeService.getResumeById(id);
      const fetchedResume = data.resume;

      const rawData =
        typeof fetchedResume.data === "string"
          ? JSON.parse(fetchedResume.data)
          : fetchedResume.data;

      setResume({
        ...fetchedResume,
        data: { ...createEmptyResumeData(), ...rawData },
      });

      setLoading(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return;
      }
      console.error("Failed to load resume:", err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadResume();
  }, [id, loadResume]);

  const handleSave = useCallback(async () => {
    if (!resume || !resume.data || !id) return;
    if (!isDirty || saving) return;

    setSaveError(null);

    if (PUBLIC_TEMPLATES.includes(id)) {
      localStorage.setItem(`guest_resume_${id}`, JSON.stringify(resume));
      setIsDirty(false);
      return;
    }

    try {
      setSaving(true);

      await ResumeService.updateResume(id, {
        title: resume.title,
        data: resume.data,
      });

      setIsDirty(false);
      localStorage.removeItem(`emergency_backup_${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError<{ error?: string }>(err)) {
        if (err.response?.status === 429) {
          setSaveError(
            err.response?.data?.error ||
              "You are saving documents too quickly. Please wait a moment.",
          );
        } else {
          setSaveError(
            "Failed to sync changes with the cloud. Please try again.",
          );
        }
        console.error(
          "Save failed details:",
          err.response?.data || err.message,
        );
      } else if (err instanceof Error) {
        setSaveError(err.message);
      } else {
        setSaveError("An unexpected error occurred while saving.");
      }
    } finally {
      setSaving(false);
    }
  }, [id, isDirty, resume, saving]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!resume || !id || !isDirty || PUBLIC_TEMPLATES.includes(id)) return;
    localStorage.setItem(`emergency_backup_${id}`, JSON.stringify(resume));
  }, [resume, id, isDirty]);

  const updatePersonal = (
    field: keyof ResumeData["personal"],
    value: string,
  ) => {
    setIsDirty(true);
    setSaveError(null);
    setResume((prev: Resume | null) => {
      if (!prev) return null;
      return {
        ...prev,
        data: {
          ...prev.data,
          personal: {
            ...prev.data.personal,
            [field]: value,
          },
        },
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updatePersonal("image", previewUrl);
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
    saveError,
  };
};
