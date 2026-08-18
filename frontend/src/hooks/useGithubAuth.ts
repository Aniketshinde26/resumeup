import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { initiateGithubLogin } from "../services/githubAuth";
import { useAuth } from "../context/AuthContext";
import type { AuthResponse } from "../types/user";

export const useGithubAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasCalled = useRef(false);

  const handleSocialClick = (platform: string) => {
    if (platform === "GitHub") {
      initiateGithubLogin();
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !hasCalled.current) {
      hasCalled.current = true;

      const handleAuth = async () => {
        try {
          const response = await api.post<AuthResponse>("auth/github", {
            code,
          });

          if (response.status === 200) {
            login(response.data.user, response.data.accessToken);
            navigate("/home", { replace: true });
          }
        } catch (error: unknown) {
          console.error("GitHub Login Failed:", error);
          navigate("/login?error=github_failed");
        }
      };

      handleAuth();
    }
  }, [searchParams, navigate, login]);

  return { handleSocialClick };
};
