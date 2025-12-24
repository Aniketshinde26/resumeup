import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage, AuthFooter } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-start justify-start bg-linear-to-br from-brand-surface to-app-bg p-8">
      <div
        className="
          w-full max-w-md
          bg-card-bg
          border border-border-subtle
          rounded-lg
          px-8 py-5
          shadow-lg
          mt-15
          ml-15
        "
      >
        {/* Brand */}
        <div className="mb-6 text-lg font-semibold text-text-main">
          ResumeUp
        </div>

        <h1 className="text-2xl font-semibold text-text-main">Sign in</h1>
        <p className="text-sm text-text-muted mt-1 mb-6">Access your account</p>

        <div className="mt-8">
          <div className="mt-8 mb-6 h-[44px] w-full rounded-md bg-slate-50/50 animate-pulse">
            <GoogleAuthButton />
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border-subtle"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card-bg px-2 text-text-muted">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="
                w-full rounded-md border border-border-subtle
                bg-slate-50 px-4 py-2.5 text-sm
                focus:bg-white focus:border-brand-primary
                focus:ring-2 focus:ring-brand-primary/20
                outline-none transition
              "
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full rounded-md bg-brand-primary py-2.5
                text-sm font-semibold text-white
                hover:bg-brand-hover transition
                disabled:opacity-60 shadow-sm
              "
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex justify-center">
          <AuthFooter
            label="New here?"
            linkText="Create an account"
            href="/register"
          />
        </div>
      </div>
    </div>
  );
}
