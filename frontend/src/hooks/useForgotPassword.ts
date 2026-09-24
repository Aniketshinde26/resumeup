import { useState } from "react";
import axios from "axios";
import api from "../api/axios";
import type { ForgotPasswordResponse } from "../types/api";
import { forgotPasswordSchema } from "../validations/authSchemas";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setFieldErrors({});

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      const errors: Partial<Record<string, string>> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        { email },
      );
      setMessage(response.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        const serverMessage =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
        setError(serverMessage);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    message,
    error,
    loading,
    fieldErrors,
    handleForgotPassword,
  };
};
