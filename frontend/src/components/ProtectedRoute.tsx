import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

const ProtectedRoute = () => {
  // null = loading, true = logged in, false = logged out
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // We call your existing route. Axios sends the cookie automatically.
        await api.get("/auth/protected");
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  // While checking with the server, show a simple loading state
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
