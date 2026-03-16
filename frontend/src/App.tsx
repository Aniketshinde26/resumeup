
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // This is your Resume List
import SelectionPage from "./pages/SelectionPage"; // The new "Home"
import ProtectedRoute from "./components/ProtectedRoute";
import Builder from "./pages/Builder";
import ResumePreview from "./pages/ResumePreview";
import DashboardLayout from "./layouts/Sidebar"; // The Sidebar wrapper
import GithubCallback from "./components/GithubCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CoverLetterDashboard from "./pages/CoverLetterDashboard";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import CoverLetterPreview from "./pages/CoverLetterPreview";
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/github/callback" element={<GithubCallback />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes Group */}
      <Route element={<ProtectedRoute />}>
        
        {/* 1. Routes WITHOUT Sidebar (Full screen previews/builders) */}
        <Route path="/builder/:id" element={<Builder />} />
        <Route path="/resume/preview/:id" element={<ResumePreview />} />
        <Route path="/cover-letter/preview/:id" element={<CoverLetterPreview />} />
        <Route path="/cover-letter-builder/:id" element={<CoverLetterBuilder />} />

        {/* 2. Routes WITH Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<SelectionPage />} />
          <Route path="/my-resumes" element={<Dashboard />} />
          <Route path="/cover-letter" element={<CoverLetterDashboard />} />
          <Route path="/ats-check" element={<div>ATS Scorer Coming Soon</div>} />
        </Route>

      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}