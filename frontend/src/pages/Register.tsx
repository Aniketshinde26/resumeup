import { AuthFooter, ErrorMessage } from "../components/ui";
import PasswordInput from "../components/PasswordInput";
import GoogleAuthButton from "../components/GoogleAuthButton";

import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
export default function Register() {
  const {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleRegister,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-start justify-center lg:intems-start lg:justify-start bg-linear-to-br from-brand-surface to-app-bg p-4 p-8">
      <div
        className="
          w-full max-w-md
          bg-card-bg
          border border-border-subtle
          rounded-lg
          px-4 py-8
          sm:px-8
          shadow-lg
          lg:mt-15
          lg:ml-15
        "
      >
        {/* Brand */}

        <Link
          to="/"
          className="mb-6 block text-lg font-semibold text-text-main"
        >
          ResumeUp
        </Link>
        <h1 className="text-2xl font-semibold text-text-main">
          Create account
        </h1>
        <p className="text-sm text-text-muted mt-1 mb-6">
          Join us to get started
        </p>
        <div className="mt-8 mb-6 h-[44px] w-full rounded-md bg-slate-50/50 animate-pulse">
          <GoogleAuthButton />
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-subtle"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card-bg px-2 text-text-muted">
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
            value={fullname}
            required
            onChange={(e) => setFullname(e.target.value)}
            /* 🎨 THEME UPDATE: used brand colors */
            className="w-full rounded-md border border-border-subtle bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition"
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border-subtle bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition"
          />

          {/* Password Field */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            /* 🎨 THEME UPDATE: used brand-primary and shadow-sm */
            className="w-full rounded-md bg-brand-primary py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition disabled:opacity-60 shadow-sm"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="mt-10 pt-6 border-t border-border-subtle flex justify-center">
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
