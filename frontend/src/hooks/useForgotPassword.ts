import { useState } from "react";
import api from "../api/axios"; 


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
      const response = await api.post("/auth/forgot-password", { email }); 
      setMessage(response.data.message);
    } catch (err: any) {
      // 🛠️ FIX: Capture backend error message for ALL status codes (including 429)
      const serverMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(serverMessage);
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