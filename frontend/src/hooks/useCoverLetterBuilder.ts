import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import type { CoverLetterByIdResponse } from "../types/api";
import type { coverLetter } from "../types/templateindex";


export const useCoverLetterBuilder = () => {
    const { id } = useParams<{ id: string }>();

    const [coverLetter, setCoverLetter] = useState<coverLetter | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);

    const updateData = (newData: any) => {
        setIsDirty(true);
        setCoverLetter((prev: any) => ({
            ...prev,
            Data: { ...prev.Data, ...(newData.Data || newData) },
        }));
    };

const loadCoverLetter = useCallback(async () => {

    try {
        setLoading(true);
        const res = await api.get<CoverLetterByIdResponse>(`/cover-letters/${id}`);
        
        const fetchedLetter = res.data.coverletter;

        const rawData = typeof fetchedLetter.Data === "string"
            ? JSON.parse(fetchedLetter.Data)
            : fetchedLetter.Data;
        setCoverLetter({
            ...fetchedLetter,
            Data: { ...fetchedLetter.Data, ...rawData }
        });
    } catch (error) {
        console.error("Error loading cover letter:", error);
    } finally {
        setLoading(false);
    }
}, [id]);

    useEffect(() => {
        if (id) loadCoverLetter();
    }, [id, loadCoverLetter]);

    useEffect(() => {
        if (!coverLetter || !coverLetter.Data || !id) return;
        if (!isDirty || saving) return;

        const timer = setTimeout(() => {
            handleSave();
        }, 1500);

        return () => clearTimeout(timer);
    }, [isDirty, coverLetter?.Data, saving, id]);

    const handleSave = async () => {
        if (!coverLetter || !coverLetter.Data || !id) return;
        if (!isDirty || saving) return;

        try {
            setSaving(true);
            await api.put<CoverLetterByIdResponse>(`/cover-letters/${id}`, {
                Title: coverLetter.Title,
                Data: coverLetter.Data,
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
        setCoverLetter((prev: any) => ({
            ...prev,
            Data: {
                ...prev.Data,
                personal: { ...prev.Data.personal, [field]: value },
            },
        }));
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
        updateData,
        loadCoverLetter,
        handleSave,
        updatePersonal,
        handleFileChange,
    };
};