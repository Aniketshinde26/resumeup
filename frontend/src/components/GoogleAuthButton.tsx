import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { GoogleCredentialResponse } from "../types/api";
import type { AuthResponse } from "../types/user";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            ux_mode?: "popup" | "redirect";
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              width?: number;
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
            },
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleAuthButton() {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleCredentialResponse = async (
    response: GoogleCredentialResponse,
  ) => {
    try {
      const res = await api.post<AuthResponse>("/auth/google", {
        id_token: response.credential,
      });

      if (res.data?.accessToken) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.accessToken}`;
        login(res.data.user, res.data.accessToken);
        navigate("/home", { replace: true });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        alert(error.response?.data?.message || "Google login failed.");
      } else {
        alert("Google login failed.");
      }
    }
  };

  useEffect(() => {
    const initializeGsi = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      // Clear previous instances if re-rendered
      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: Math.min(350, window.innerWidth - 48), // Adapts width to screen size on mobile
      });
    };

    if (window.google) {
      initializeGsi();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGsi;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-1">
      <div ref={googleButtonRef} className="min-h-[44px]" />
    </div>
  );
}