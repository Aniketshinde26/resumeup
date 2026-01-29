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
        // We just 'await' the call. The browser handles the Set-Cookie header.
        await api.post("/auth/google", {
          id_token: response.credential,
        });

        // No more 'data' variable needed here!
        navigate("/home");
      } catch (error: any) {
        alert(error.response?.data?.message || "Google login failed.");
      }
    },
    [navigate]
  );

  useEffect(() => {
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
          size: "large",
          shape: "rectangular",
          text: "continue_with",

          width: buttonRef.current?.offsetWidth || 350,
        });
      }
    };

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
      renderButton();
    }
  }, [handleCredentialResponse]);

  return (
    <div className="mb-5 w-full flex justify-center min-h-[44px]">
      <div ref={buttonRef} className="w-full max-w-[350px]" />
    </div>
  );
}
