import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

// Assuming you want the same public templates available for cover letters
const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

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
            Data: { ...prev.Data, ...(newData.Data || newData) },
        }));
    };

    const loadCoverLetter = useCallback(async () => {
        if (!id) return;

        // 1. Guest Mode Check
        if (PUBLIC_TEMPLATES.includes(id as string)) {
            console.log("Guest Mode: Loading template structure for", id);
            const guestCoverLetter = {
                id: id,
                Title: id === "moderntech" ? "Modern Tech Cover Letter" : "Professional Cover Letter",
                TemplateId: id,
                Data: {},
            };
            setCoverLetter(guestCoverLetter);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await api.get(`/cover-letter/${id}`);
            const fetchedCoverLetter = res.data.coverLetter || res.data;

            if (typeof fetchedCoverLetter.data === "string") {
                try {
                    fetchedCoverLetter.data = JSON.parse(fetchedCoverLetter.data);
                } catch (e) {
                    console.error("Failed to parse cover letter data string", e);
                    fetchedCoverLetter.data = {};
                }
            }

            // Ensure nested objects exist specifically for cover letters
            if (!fetchedCoverLetter.data) fetchedCoverLetter.data = {};
            const fields = ['personal', 'recipient', 'letter'];
            fields.forEach(field => {
                if (!fetchedCoverLetter.data[field]) {
                    fetchedCoverLetter.data[field] = {}; 
                }
            });

            setCoverLetter(fetchedCoverLetter);
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
        if (!coverLetter || !coverLetter.data || !id) return;
        if (!isDirty || saving) return;

        // Prevent auto-save for guests
        if (PUBLIC_TEMPLATES.includes(id as string)) return;

        const timer = setTimeout(() => {
            handleSave();
        }, 1000);

        return () => clearTimeout(timer);
    }, [isDirty, coverLetter?.data, saving, coverLetter, id]);

    const handleSave = async () => {
        if (!coverLetter || !coverLetter.Data || !id) return;
        if (!isDirty || saving) return;

        // Block manual save for guests
        if (PUBLIC_TEMPLATES.includes(id as string)) {
            console.log("Guest Mode: Save disabled");
            return;
        }

        try {
            setSaving(true);
            await api.put(`/cover-letter/${id}`, {
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
            updatePersonal("image", previewUrl); // Adjusted to match your template's "image" property
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