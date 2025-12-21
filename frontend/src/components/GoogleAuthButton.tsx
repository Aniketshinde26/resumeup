import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// 1. Vite uses import.meta.env instead of process.env
// Ensure your .env file variable starts with VITE_
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export default function GoogleAuthButton() {
  // 2. Add type for the ref
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(
    async (response: any) => {
      // You can type this properly later
      try {
        const idToken = response.credential;

        const res = await api.post("/auth/google", {
          id_token: idToken,
        });

        console.log("Google login success:", res.data);
        navigate("/dashboard");
      } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.message || "Google login failed.");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      // 3. Use 'any' cast to allow window.google access in TS
      const google = (window as any).google;

      if (!google) return;

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      if (buttonRef.current) {
        google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: 300,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [handleCredentialResponse]);

  return (
    <div className="my-4 flex justify-center">
      <div ref={buttonRef}></div>
    </div>
  );
}
