import { useState } from "react";
import axios from "axios";

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
      // Note: In the future, replace the hardcoded URL with your env variable
// src/hooks/useForgotPassword.ts
const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
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