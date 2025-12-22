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
    <div className="min-h-screen flex items-start justify-start  from-indigo-50 to-blue-100 p-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg px-8 py-10 shadow-lg">
        {/* Brand */}
        <div className="mb-6 text-lg font-semibold text-slate-900">
          ResumeUp
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Access your account</p>

        {/* 🚀 STEP 3: I HAVE PLACED THE BUTTON HERE */}
        <GoogleAuthButton />
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">
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
              w-full rounded-md border border-slate-200
              bg-slate-50 px-4 py-2.5 text-sm
              focus:bg-white focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-500/20
              outline-none
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
              w-full rounded-md bg-indigo-600 py-2.5
              text-sm font-semibold text-white
              hover:bg-indigo-700 transition
              disabled:opacity-60
            "
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-200">
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
