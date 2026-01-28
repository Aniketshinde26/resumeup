import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Builder from "./pages/Builder";
import ResumePreview from "./pages/ResumePreview";
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* MOVED OUTSIDE: So guests can try templates */}
      <Route path="/builder/:id" element={<Builder />} />

      {/* Protected Routes Group */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can keep the preview protected if you want, 
            or move it out too if guests should see previews */}
        <Route path="/resume/preview/:id" element={<ResumePreview />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
