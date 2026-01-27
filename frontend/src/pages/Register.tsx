import { useRegister } from "../hooks/useRegister";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-surface p-4 sm:p-6">
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row w-full max-w-6.4xl min-h-[680px] overflow-hidden rounded-3xl bg-card-bg shadow-2xl">
        
        
      {/* LEFT SECTION: Brand & Features */}
<div className="relative hidden lg:flex lg:w-1/2 p-16 flex-col justify-between bg-slate-900/40 overflow-hidden">
  {/* Abstract Background Decoration */}
  <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

  {/* Top: Logo/Brand */}
  <div className="relative z-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/30">
        R
      </div>
      <span className="text-2xl font-bold text-white tracking-tight">ResumeUp</span>
    </div>
  </div>

  {/* Middle: Value Prop / Feature List */}
  <div className="relative z-15 space-y-15">
    <h3 className="text-5xl font-bold text-white leading-tight">
      Land your dream job <br /> 
      <span className="text-brand-primary">with confidence.</span>
    </h3>
    
    <div className="space-y-15">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center mt-1">
          <div className="w-2 h-2 rounded-full bg-brand-primary" />
        </div>
        <div>
          <h4 className="text-white font-semibold">ATS-Friendly Templates</h4>
          <p className="text-text-muted text-sm mt-1">Pass the automated filters with proven layouts.</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
        </div>
        <div>
          <h4 className="text-white font-semibold">Real-time Editing</h4>
          <p className="text-text-muted text-sm mt-1">See your changes instantly with our live preview.</p>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom: Social Proof / Status */}

</div>

        {/* RIGHT SECTION: The Register Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center ">
          <div className="border border-border-subtle/50 rounded-2xl p-8 sm:p-10">
            
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
              <p className="text-text-muted text-sm">
                Already have an account? <Link to="/login" className="text-brand-primary hover:underline">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {error && <ErrorMessage message={error} />}

              {/* Full Name Input */}
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
                className="w-full rounded-lg bg-input-bg border border-border-subtle px-4 py-3 text-sm text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition placeholder:text-text-muted"
              />

              {/* Email Input */}
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
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <span className="absolute inset-x-0 top-1/2 h-px bg-border-subtle/50"></span>
              <span className="relative bg-card-bg px-4 text-xs text-text-muted uppercase tracking-wider">
                Or join with
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