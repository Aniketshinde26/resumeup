import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import type { ResetPasswordResponse } from "../types/user";
import { resetPasswordSchema } from "../validations/authSchemas";

export const useResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setFieldErrors({});

    const result = resetPasswordSchema.safeParse({ password });
    if (!result.success) {
      const errors: Partial<Record<string, string>> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post<ResetPasswordResponse>(
        `/auth/reset-password/${token}`,
        { password },
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(err.response?.data?.message || "Link expired or invalid.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    error,
    loading,
    fieldErrors,
    handleResetPassword,
  };
};
