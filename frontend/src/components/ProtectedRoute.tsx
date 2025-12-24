// import { Navigate } from "react-router-dom";
// import type { ReactNode } from "react";

// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
