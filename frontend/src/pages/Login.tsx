import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useNavigate, Link } from "react-router-dom";
import { useGithubAuth } from "../hooks/useGithubAuth";

export default function Login() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useLogin();

  const {handleSocialClick} = useGithubAuth();

  const templates = [
    { id: 'moderntech', name: 'Modern Tech' },
    { id: 'neoprofessional', name: 'Professional' }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 sm:p-6 font-sans text-slate-900">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl min-h-[400px] overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
        
        {/* LEFT SECTION */}
        <div className="lg:w-[50%] bg-slate-50 p-10 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/15 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div className="flex items-center gap-0 tracking-tight">
                <span className="text-slate-900 font-bold text-xl">Resume</span>
                <span className="text-green-600 font-bold text-xl">Up</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Step into your <br/> next role.</h2>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-5 my-8">
            {templates.map((tpl) => (
              <div key={tpl.id} onClick={() => navigate(`/builder/${tpl.id}`)} className="group cursor-pointer">
                <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden border border-slate-200 bg-white group-hover:border-brand-primary/40 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img src={`/previews/${tpl.id}.png`} alt={tpl.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">{tpl.name}</p>
              </div>
            ))}
          </div>
          <div className="relative z-10 pt-4 border-t border-slate-200">
            <p className="text-[10px] text-slate-400 font-medium">Login to explore more</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:w-[55%] p-10 sm:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in</h1>
              <p className="text-slate-500 text-sm mt-1">Welcome back, please enter your details.</p>
            </div>

            {/* Social Logins */}
          <div className="flex items-center gap-3 mb-8 w-full max-w-[350px] mx-auto">
  {/* 1. Google Button - Now part of the flex row */}
  <div className="flex-1 transform hover:scale-[1.01] transition-all">
    <GoogleAuthButton />
  </div>

  {/* 2. GitHub Button - Now matching the flex-1 size */}
  <button 
    type="button" 
    onClick={() => handleSocialClick('GitHub')} 
    className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-primary hover:border-brand-primary/30 transition-all uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2"
  >
    {/* Added SVG so it matches the Google "Icon + Text" look */}
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
    GitHub
  </button>
</div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">OR</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && <ErrorMessage message={error} />}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  placeholder="e.g. alex@work.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot" className="text-[10px] text-brand-primary font-bold hover:underline">Forgot?</Link>
                </div>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="text-brand-primary font-bold hover:underline">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}