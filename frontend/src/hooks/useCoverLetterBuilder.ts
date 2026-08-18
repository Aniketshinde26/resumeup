import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import type { CoverLetterByIdResponse } from "../types/api";
import type { CoverLetterData, coverLetter } from "../types/templateindex";

export const useCoverLetterBuilder = () => {
  const { id } = useParams<{ id: string }>();

  const [coverLetter, setCoverLetter] = useState<coverLetter | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateData = (newData: Partial<CoverLetterData>) => {
    setIsDirty(true);
    setSaveError(null);
    setCoverLetter((prev: coverLetter | null) => {
      if (!prev) return null;
      return {
        ...prev,
        Data: { ...prev.Data, ...newData },
      };
    });
  };

  const loadCoverLetter = useCallback(async () => {
    if (!id) return;

    // 1. Check emergency backup first
    const emergencyBackup = localStorage.getItem(
      `emergency_backup_coverletter_${id}`,
    );
    if (emergencyBackup) {
      try {
        setCoverLetter(JSON.parse(emergencyBackup));
        setIsDirty(true);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(`emergency_backup_coverletter_${id}`);
      }
    }

    // 2. Fetch from backend API
    try {
      setLoading(true);
      const res = await api.get<CoverLetterByIdResponse>(
        `/cover-letters/${id}`,
      );

      const fetchedLetter = res.data.coverletter;

      const rawData =
        typeof fetchedLetter.Data === "string"
          ? JSON.parse(fetchedLetter.Data)
          : fetchedLetter.Data;

      setCoverLetter({
        ...fetchedLetter,
        Data: { ...fetchedLetter.Data, ...rawData },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return;
      }
      console.error("Error loading cover letter:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadCoverLetter();
  }, [id, loadCoverLetter]);

  const handleSave = useCallback(async () => {
    if (!coverLetter || !coverLetter.Data || !id) return;
    if (!isDirty || saving) return;

    setSaveError(null);

    try {
      setSaving(true);
      await api.put<CoverLetterByIdResponse>(`/cover-letters/${id}`, {
        Title: coverLetter.Title,
        Data: coverLetter.Data,
      });

      setIsDirty(false);
      localStorage.removeItem(`emergency_backup_coverletter_${id}`);
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
  }, [coverLetter, id, isDirty, saving]);

  // Warn user if navigating away with unsaved changes
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

  // Sync to local emergency storage during unsaved modifications
  useEffect(() => {
    if (!coverLetter || !id || !isDirty) return;
    localStorage.setItem(
      `emergency_backup_coverletter_${id}`,
      JSON.stringify(coverLetter),
    );
  }, [coverLetter, id, isDirty]);

  const updatePersonal = (
    field: keyof CoverLetterData["personal"],
    value: string,
  ) => {
    setIsDirty(true);
    setSaveError(null);
    setCoverLetter((prev: coverLetter | null) => {
      if (!prev) return null;
      return {
        ...prev,
        Data: {
          ...prev.Data,
          personal: {
            ...prev.Data?.personal,
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
    coverLetter,
    loading,
    saving,
    isDirty,
    tempImage,
    setTempImage,
    saveError,
    updateData,
    loadCoverLetter,
    handleSave,
    updatePersonal,
    handleFileChange,
  };
};
