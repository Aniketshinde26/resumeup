

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // This is your Resume List
import SelectionPage from "./pages/SelectionPage"; // The new "Home"
import ProtectedRoute from "./components/ProtectedRoute";
import Builder from "./pages/Builder";
import ResumePreview from "./pages/ResumePreview";
import DashboardLayout from "./layouts/Sidebar"; // The Sidebar wrapper

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Builder: Usually kept separate so you have full-screen space to design */}
      <Route path="/builder/:id" element={<Builder />} />
          <Route path="/resume/preview/:id" element={<ResumePreview />} />

      {/* Protected Routes Group with Sidebar */}
      <Route element={<ProtectedRoute />}>
        {/* Everything inside here will have the Sidebar */}
        <Route element={<DashboardLayout />}>
          {/* This is the new 'Home' where they select options */}
          <Route path="/home" element={<SelectionPage />} />
          
          {/* Your current dashboard (The Resume List) */}
          <Route path="/my-resumes" element={<Dashboard />} />
          
          {/* Future features can go here */}
          <Route path="/cover-letter" element={<div>Cover Letter Feature Coming Soon</div>} />
          <Route path="/ats-check" element={<div>ATS Scorer Coming Soon</div>} />
          
        </Route>
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}