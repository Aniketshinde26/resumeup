import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { AuthResponse } from "../types/user";
import { initiateGithubLogin } from "../services/githubAuth";
import { loginSchema } from "../validations/authSchemas";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });
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
      const res = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      if (res.data.accessToken) {
        login(res.data.user, res.data.accessToken);
        navigate("/home", { replace: true });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    fieldErrors,
    handleLogin,
    initiateGithubLogin,
  };
};
