// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  // Use the global centralized auth state instead of local state + useEffect
  const { user, loading } = useAuth();

  // 1. While the app is doing its single initial startup handshake, show loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. If the check finishes and no user session was recovered, send to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;