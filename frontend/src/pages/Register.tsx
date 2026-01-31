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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 sm:p-6 font-sans text-slate-900">
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl min-h-[600px] overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
        
        {/* LEFT SECTION: BRAND & FEATURES (Matches Login Showcase style) */}
{/* LEFT SECTION: DESIGN FILLER */}
<div className="lg:w-[45%] bg-slate-50 p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
  
  {/* 1. LAYERED BACKGROUND (Fills the 'Empty' air) */}
  {/* Subtle Dot Grid */}
  <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
  
  {/* Larger Glowing Blobs */}
  <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />

  <div className="relative z-10">
    {/* Logo */}
    <div className="flex items-center gap-2.5 mb-12">
      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-md shadow-brand-primary/20">
        <span className="text-white font-bold text-sm">R</span>
      </div>
      <span className="text-lg font-bold text-slate-900 tracking-tight">ResumeUp</span>
    </div>
    
    <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
      Build your future <br /> 
      <span className="text-brand-primary">piece by piece.</span>
    </h2>

    {/* 2. ENHANCED UI MOCKUP (Added Stacking for Density) */}
    <div className="mt-16 relative px-4">
      
      {/* BACKGROUND 'GHOST' CARD (Fills space behind) */}
      <div className="absolute top-[-20px] left-10 right-4 h-10 bg-slate-100/50 rounded-2xl border border-slate-200/50 -rotate-10" />

      {/* Main Decorative Progress Card */}
      <div className="relative z-10 bg-white rounded-2xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-200/60 rotate-[-2deg] mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1.5">
            <div className="h-2 w-24 bg-slate-100 rounded-full" />
            <div className="h-2 w-16 bg-slate-50 rounded-full" />
          </div>
          <div className="h-8 w-8 bg-brand-primary/10 rounded-xl flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full w-[75%] bg-brand-primary rounded-full shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.3)]" />
          </div>
          <div className="flex justify-between items-center">
             <div className="h-1.5 w-[30%] bg-slate-100 rounded-full" />
             <div className="h-1.5 w-[15%] bg-slate-100 rounded-full" />
          </div>
        </div>
      </div>

      {/* Glassmorphism Floating Stats (Enlarged) */}
      <div className="absolute -top-6 -left-4 z-30 bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-2xl shadow-slate-200/50 rotate-[4deg] w-52">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ATS Match</p>
            <p className="text-xl font-black text-slate-900">92.8%</p>
          </div>
        </div>
      </div>

      {/* SMALL DECORATIVE 'TAG' (Fills bottom right gap) */}
      <div className="absolute -bottom-4 right-0 z-30 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
        Optimize your job hunt
      </div>
    </div>
  </div>


</div>

        {/* RIGHT SECTION: THE REGISTER FORM */}
        <div className="lg:w-[50%] p-10 sm:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create account</h1>
              <p className="text-slate-500 text-sm mt-1">Get started with your free account today.</p>
            </div>

            {/* Social Registration */}
            <div className="space-y-3 mb-8">
              <div className="transform hover:scale-[1.01] transition-transform">
                <GoogleAuthButton />
              </div>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">OR REGISTER WITH EMAIL</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {error && <ErrorMessage message={error} />}

              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={fullname}
                  required
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  placeholder="e.g. alex@work.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-brand-primary font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}