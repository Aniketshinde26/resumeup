import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleAuthButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(
    async (response: any) => {
      try {
        const { data } = await api.post("/auth/google", {
          id_token: response.credential,
        });
        localStorage.setItem("token", data.accessToken);
        navigate("/dashboard");
      } catch (error: any) {
        alert(error.response?.data?.message || "Google login failed.");
      }
    },
    [navigate]
  );

  useEffect(() => {
    // Function to render the button
    const renderButton = () => {
      const google = (window as any)?.google;
      if (google && buttonRef.current) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          ux_mode: "popup",
        });

        google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large", // "large" is the standard height that matches py-2.5 inputs
          shape: "rectangular",
          text: "continue_with",
          // 🔑 This ensures it fills the container width
          width: buttonRef.current?.offsetWidth || 350,
        });
      }
    };

    // Check if script already exists to avoid duplicates
    let script = document.getElementById(
      "google-login-script"
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = "google-login-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = renderButton;
      document.head.appendChild(script);
    } else {
      // If script exists, just render (handles HMR/re-renders)
      renderButton();
    }

    // Note: We REMOVED the removeChild cleanup because it breaks Google's global state
  }, [handleCredentialResponse]);

  return (
    <div className="mb-5 w-full flex justify-center min-h-[44px]">
      <div ref={buttonRef} className="w-full max-w-[350px]" />
    </div>
  );
}
