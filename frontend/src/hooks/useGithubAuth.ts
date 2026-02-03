// src/hooks/useGithubAuth.ts
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios"; // Use your configured instance

export const useGithubAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasCalled = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !hasCalled.current) {
      hasCalled.current = true;
      
      const handleAuth = async () => {
        try {
          // Use the relative path. Ensure your Axios baseURL is correct!
          const response = await api.post("auth/github", { code });

          if (response.status === 200) {
            navigate("/home", { replace: true });
          }
        } catch (error) {
          console.error("GitHub Login Failed:", error);
          navigate("/login?error=github_failed");
        }
      };

      handleAuth();
    }
  }, [searchParams, navigate]);
};