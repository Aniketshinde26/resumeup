import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional", "classic"];

export const useCoverLetterBuilder = () => {
    const { id } = useParams<{ id: string }>();

    const [coverLetter, setCoverLetter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);

    const updateData = (newData: any) => {
        setIsDirty(true);
        setCoverLetter((prev: any) => ({
            ...prev,
            // Consistently use capital 'Data'
            Data: { ...prev.Data, ...(newData.Data || newData) },
        }));
    };

    const loadCoverLetter = useCallback(async () => {
        if (!id) return;

        // 1. Guest Mode Check
        if (PUBLIC_TEMPLATES.includes(id as string)) {
            setCoverLetter({
                id: id,
                Title: id === "moderntech" ? "Modern Tech Cover Letter" : "Professional Cover Letter",
                TemplateId: id,
                Data: { personal: {}, recipient: {}, letter: { bodyParagraphs: [] } },
            });
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await api.get(`/cover-letters/${id}`);
            const fetched = res.data.coverLetter || res.data.coverletter || res.data;

            // Fix the parsing logic to use capital 'Data'
            if (typeof fetched.Data === "string") {
                try {
                    fetched.Data = JSON.parse(fetched.Data);
                } catch (e) {
                    console.error("Failed to parse Data string", e);
                    fetched.Data = {};
                }
            }

            // Ensure nested objects exist so the UI doesn't crash
            if (!fetched.Data) fetched.Data = {};
            const fields = ['personal', 'recipient', 'letter'];
            fields.forEach(field => {
                if (!fetched.Data[field]) {
                    fetched.Data[field] = field === 'letter' ? { bodyParagraphs: [] } : {}; 
                }
            });

            setCoverLetter(fetched);
        } catch (error) {
            console.error("Error loading cover letter:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) loadCoverLetter();
    }, [id, loadCoverLetter]);

    // Auto-save logic
    useEffect(() => {
        // Updated to use capital 'Data'
        if (!coverLetter || !coverLetter.Data || !id) return;
        if (!isDirty || saving) return;
        if (PUBLIC_TEMPLATES.includes(id as string)) return;

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
            await api.put(`/cover-letters/${id}`, {
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