import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleAuthButton() {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await api.post("/auth/google", {
        id_token: response.credential,
      });

      if (res.data && res.data.accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
      }
      login(res.data.user, res.data.accessToken);
      navigate("/home");
    } catch (error: any) {
      alert("Google login failed.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      const google = (window as any).google;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      // We render the REAL button into a hidden container
      google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: 350, // Matches your button width
      });
    };
    document.head.appendChild(script);
  }, []);

  const triggerGoogleLogin = () => {
    // This finds the iframe created by Google and clicks it programmatically
    const buttonElement = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement;
    if (buttonElement) {
      buttonElement.click();
    } else {
      // Fallback: If querySelector fails, find the first iframe and click it
      const iframe = googleButtonRef.current?.querySelector('iframe');
      iframe?.click();
    }
  };

  return (
    <div className="relative w-full max-w-[350px]">
      {/* 1. YOUR CUSTOM BUTTON (Visuals) */}
      <button
        onClick={triggerGoogleLogin}
        type="button"
        className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-primary hover:border-brand-primary/30 transition-all uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
        </svg>
        Google
      </button>

      {/* 2. THE REAL HIDDEN GOOGLE BUTTON (Functionality) */}
      <div 
        ref={googleButtonRef} 
        className="absolute inset-0 opacity-0 cursor-pointer overflow-hidden pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}