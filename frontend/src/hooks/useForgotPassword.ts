import { useState } from "react";
import axios from "axios";
import api from "../api/axios";
import type { forgotPasswordResponse } from "../types/api";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post<forgotPasswordResponse>(
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
    handleForgotPassword,
  };
};
