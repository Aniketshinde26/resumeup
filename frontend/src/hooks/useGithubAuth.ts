// src/hooks/useGithubAuth.ts
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api,{setAccessToken} from "../api/axios"; // Use your configured instance
import { initiateGithubLogin } from "../services/githubAuth";
import { useAuth } from "../context/AuthContext";
export const useGithubAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {login} = useAuth();
  const hasCalled = useRef(false);

  const handleSocialClick = (platform: string) => {
    if (platform === 'GitHub') {
      initiateGithubLogin(); // This triggers the external redirect
    } else {
      console.log(`${platform} coming soon`);
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !hasCalled.current) {
      hasCalled.current = true;
      
      const handleAuth = async () => {
        try {
          // Use the relative path. Ensure your Axios baseURL is correct!
          const response = await api.post("auth/github", { code });

          if (response.status === 200) {
            login(response.data.user, response.data.accessToken);
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

  return{handleSocialClick};
};