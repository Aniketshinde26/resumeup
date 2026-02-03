// hooks/useLogin.ts
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { AuthResponse } from "../types/user";
import { initiateGithubLogin } from "../services/githubAuth";
export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      if (res.data.accessToken) {
       

        navigate("/home", { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
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
    handleLogin,
    initiateGithubLogin
  };
};
