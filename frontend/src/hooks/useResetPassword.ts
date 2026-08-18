import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import type { ResetPasswordResponse } from "../types/user";

export const useResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    setError("");

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
    handleResetPassword,
  };
};
