import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleAuthButton() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Handle Google credential response
  const handleCredentialResponse = useCallback(
    async (response) => {
      try {
        const idToken = response.credential;

        const res = await api.post("/auth/google", {
          id_token: idToken,
        });

        console.log("Google login success:", res.data);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Google login failed.");
      }
    },
    [navigate]
  );

  // Load the Google script + render button AFTER script loads
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      console.log("Google script loaded!");

      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: 300,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [handleCredentialResponse]);

  return (
    <div className="my-4">
      <div ref={buttonRef}></div>
    </div>
  );
}
