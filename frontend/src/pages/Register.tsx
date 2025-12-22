import { useState } from "react";
import { AuthFooter, ErrorMessage } from "../components/ui";
import PasswordInput from "../components/PasswordInput";
import GoogleAuthButton from "../components/GoogleAuthButton";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login"); // Send them to login after successful sign up
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg px-8 py-10 shadow-lg">
        {/* Brand */}
        <div className="mb-6 text-lg font-semibold text-slate-900">
          ResumeUp
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          Create account
        </h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Join us to get started
        </p>

        {/* Reuse the Google Button for consistency */}
        <GoogleAuthButton />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">
              Or use your email
            </span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <ErrorMessage message={error} />}

          {/* Name Field */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
          />

          {/* Password Field */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60 shadow-md shadow-indigo-200"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-200">
          <AuthFooter
            label="Already have an account?"
            linkText="Sign in"
            href="/login"
          />
        </div>
      </div>
    </div>
  );
}
