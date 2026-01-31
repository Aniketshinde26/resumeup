import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useNavigate, Link } from "react-router-dom";

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

  const templates = [
    { id: 'moderntech', name: 'Modern Tech' },
    { id: 'neoprofessional', name: 'Professional' }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 sm:p-6 font-sans text-slate-900">
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl min-h-[400px] overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
        
        {/* LEFT SECTION: SOFT LIGHT SHOWCASE */}
        <div className="lg:w-[50%] bg-slate-50 p-10 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/15 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-md shadow-brand-primary/">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">ResumeUp</span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Step into your <br/> next role.</h2>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-5 my-8">
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                onClick={() => navigate(`/builder/${tpl.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden border border-slate-200 bg-white group-hover:border-brand-primary/40 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img 
                    src={`/previews/${tpl.id}.png`} 
                    alt={tpl.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">
                  {tpl.name}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-200">
            <p className="text-[10px] text-slate-400 font-medium">Login to explore more</p>
          </div>
        </div>

        {/* RIGHT SECTION: CLEAN LIGHT LOGIN */}
        <div className="lg:w-[55%] p-10 sm:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in</h1>
              <p className="text-slate-500 text-sm mt-1">Welcome back, please enter your details.</p>
            </div>

            {/* Social Logins */}
            <div className="space-y-3 mb-8">
              <div className="transform hover:scale-[1.01] transition-transform">
                <GoogleAuthButton />
              </div>
              
              <div className="flex gap-2.5">
                {['GitHub', 'LinkedIn', 'Facebook'].map((p) => (
                  <button 
                    key={p} 
                    type="button" 
                    className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-primary hover:border-brand-primary/30 transition-all uppercase tracking-wider active:scale-95"
                  >
                    {p}
                  </button>
                ))}
              </div>
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
                {/* Note: Ensure PasswordInput component is also set to a light theme internally */}
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