import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react"; // 1. Import Suspense
import { I18nextProvider } from "react-i18next"; // 2. Import Provider
import i18n from "./i18n"; // 3. Import the instance (ensure i18n.ts has 'export default i18n')

// ... your other imports ...
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; 
import SelectionPage from "./pages/SelectionPage"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Builder from "./pages/Builder";
import ResumePreview from "./pages/ResumePreview";
import DashboardLayout from "./layouts/Sidebar"; 
import GithubCallback from "./components/GithubCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CoverLetterDashboard from "./pages/CoverLetterDashboard";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import CoverLetterPreview from "./pages/CoverLetterPreview";
import { ThemeProvider } from "./context/ThemeContext"; // Import the ThemeProvider

export default function App() {
  return (
    // 4. Wrap everything in the Provider and Suspense
    <ThemeProvider>
    <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div className="flex h-screen items-center justify-center font-bold">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/github/callback" element={<GithubCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/builder/:id" element={<Builder />} />


          {/* Protected Routes Group */}
          <Route element={<ProtectedRoute />}>
            
            {/* 1. Routes WITHOUT Sidebar */}
            <Route path="/resume/preview/:id" element={<ResumePreview />} />
            <Route path="/cover-letters/preview/:id" element={<CoverLetterPreview />} />
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
      </Suspense>
     
    </I18nextProvider>
    </ThemeProvider>
  );
}