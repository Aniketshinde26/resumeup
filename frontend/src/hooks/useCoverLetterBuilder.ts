import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const PUBLIC_TEMPLATES = ["moderntech", "neoprofessional"];

const useCoverLetterBuilder = () => {
    const { id } = useParams<{ id: string }>();

    const [coverLetter, setCoverLetter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // 1. Logic to load the cover letter
    const loadCoverLetter = useCallback(async () => {
        if (!id) return;

        if (PUBLIC_TEMPLATES.includes(id)) {
            const guestCoverLetter = {
                id: id,
                Title: id === "moderntech" ? "Modern Tech Cover Letter" : "Professional Cover Letter",
                TemplateId: id,
                data: {
                    personal: {},
                    salutation: "",
                    introduction: "",
                    body: "",
                    closing: "",
                    signature: ""
                },
            };
            setCoverLetter(guestCoverLetter);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await api.get(`/cover-letter/${id}`);
            let fetchedCoverLetter = res.data.coverLetter || res.data;

            // Handle data parsing
            if (typeof fetchedCoverLetter.data === "string") {
                try {
                    fetchedCoverLetter.data = JSON.parse(fetchedCoverLetter.data);
                } catch (e) {
                    fetchedCoverLetter.data = {};
                }
            }

            if (!fetchedCoverLetter.data) fetchedCoverLetter.data = {};

            // Ensure all fields exist
            const fields = ['personal', 'salutation', 'introduction', 'body', 'closing', 'signature'];
            fields.forEach(field => {
                if (!fetchedCoverLetter.data[field]) {
                    fetchedCoverLetter.data[field] = field === 'personal' ? {} : "";
                }
            });

            setCoverLetter(fetchedCoverLetter);
        } catch (err) {
            console.error("Failed to load cover letter", err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    // 2. Logic to save the cover letter
    const handleSave = useCallback(async () => {
        if (!coverLetter || !coverLetter.data || !id || !isDirty || saving) return;

        if (PUBLIC_TEMPLATES.includes(id)) {
            console.log("Guest Mode: Skipping save");
            return;
        }

        try {
            setSaving(true);
            await api.put(`/cover-letter/${id}`, {
                Title: coverLetter.Title,
                Data: coverLetter.data,
            });
            setIsDirty(false);
        } catch (err: any) {
            console.error("Save failed", err.response?.data || err.message);
        } finally {
            setSaving(false);
        }
    }, [coverLetter, id, isDirty, saving]);

    // Effect: Load on Mount
    useEffect(() => {
        loadCoverLetter();
    }, [loadCoverLetter]);

    // Effect: Auto-save timer
    useEffect(() => {
        if (!isDirty || PUBLIC_TEMPLATES.includes(id as string)) return;

        const timer = setTimeout(() => {
            handleSave();
        }, 2000); // 2 second debounce

        return () => clearTimeout(timer);
    }, [coverLetter?.data, isDirty, handleSave, id]);

    // Helpers
    const updatePersonalInfo = (field: string, value: string) => {
        setIsDirty(true);
        setCoverLetter((prev: any) => ({
            ...prev,
            data: {
                ...prev.data,
                personal: { ...prev.data.personal, [field]: value },
            },
        }));
    };

    const update = (newData: any) => {
        setIsDirty(true);
        setCoverLetter((prev: any) => ({
            ...prev,
            data: { ...prev.data, ...(newData.data || newData) },
        }));
    };

    return {
        coverLetter,
        setCoverLetter,
        update,
        loading,
        saving,
        handleSave,
        updatePersonalInfo
    };
};

export default useCoverLetterBuilder;