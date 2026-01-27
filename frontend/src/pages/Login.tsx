import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-surface p-4 sm:p-6">
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row w-full max-w-6.4xl min-h-[680px] overflow-hidden rounded-3xl bg-card-bg shadow-2xl">
        
        {/* LEFT SECTION: Brand & Impact (Matches Register) */}
        <div className="relative hidden lg:flex lg:w-1/2 p-16 flex-col justify-between bg-slate-900/40 overflow-hidden border-r border-border-subtle/10">
          
          {/* Abstract Background Decoration */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

          {/* Top: Logo/Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/30">
                R
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ResumeUp</span>
            </div>
          </div>

          {/* Middle: Content */}
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              Welcome back to <br /> 
              <span className="text-brand-primary">your future.</span>
            </h2>
            <p className="text-text-muted text-lg max-w-md">
              Log in to continue building your professional story and apply to your dream roles.
            </p>
          </div>

          {/* Bottom: Glassmorphism Card */}
          <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Ready to go?</p>
                <p className="text-xs text-white/60">Your last edits were saved automatically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: The "Merged" Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center ">
          <div className="border border-border-subtle/50 rounded-2xl p-8 sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
              <p className="text-text-muted text-sm">
                New here? <Link to="/register" className="text-brand-primary hover:underline">Create an account</Link>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && <ErrorMessage message={error} />}

              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg bg-input-bg border border-border-subtle px-4 py-3 text-sm text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition placeholder:text-text-muted"
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-brand-primary py-3 text-sm font-semibold text-white hover:bg-brand-hover transition disabled:opacity-60 shadow-lg shadow-brand-primary/20"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <span className="absolute inset-x-0 top-1/2 h-px bg-border-subtle/50"></span>
              <span className="relative bg-card-bg px-4 text-xs text-text-muted uppercase tracking-wider">
                Or continue with email
              </span>
            </div>

            <div className="h-[44px]">
              <GoogleAuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}