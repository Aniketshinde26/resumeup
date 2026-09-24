import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { RegisterResponse } from "../types/user";
import { registerSchema } from "../validations/authSchemas";
import axios from "axios";
export const useRegister = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const result = registerSchema.safeParse({ fullname, email, password });
    if (!result.success) {
      const errors: Partial<Record<string, string>> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      await api.post<RegisterResponse>("/auth/register", {
        fullname,
        email,
        password,
      });
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    fieldErrors,
    handleRegister,
  };
};
