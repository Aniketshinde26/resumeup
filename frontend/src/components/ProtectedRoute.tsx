import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api, { setAccessToken } from "../api/axios";

const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. First, get a fresh access token using the httpOnly refresh cookie
        const { data } = await api.post("/auth/refresh");
        
        // 2. Fill the memory vault BEFORE anything else renders
        setAccessToken(data.accessToken);
        
        setIsAuthorized(true);
      } catch (error) {
        // Refresh cookie is missing or expired — user must log in
        setAccessToken(null);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;