import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useNavigate, Link } from "react-router-dom";
import { useGithubAuth } from "../hooks/useGithubAuth";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";
import ThemeToggle from "../components/ThemeToggle";
import ActionPanel from "../components/ActionPanel";
export default function Login() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
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

  const { handleSocialClick } = useGithubAuth();

  const templates = [
    { id: 'moderntech', name: 'Modern Tech' },
    { id: 'neoprofessional', name: 'Professional' }
  ];

  return (
  <div className="min-h-screen w-full flex items-center justify-center (--color-brand-firstlayer) p-4 sm:p-6 font-sans text-slate-900">      {/* --- SHARED TOGGLE CONTAINER --- */}
    
    <div className="w-full max-w-6xl">
      <ActionPanel/>

<div className="flex flex-col lg:flex-row w-full min-h-[600px] overflow-hidden rounded-[2rem] bg-(--color-card-bg) border border-(--color-border-subtle) shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">        
        {/* LEFT SECTION */}
<div className="lg:w-[50%] bg-slate-100 p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
  {/* Larger Glowing Blobs */}
  <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />

          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-md">
                
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div className="flex items-center gap-0 tracking-tight">
                <span className="font-bold text-xl" style={{ color: 'var(--color-brand-name)' }}>
                  Resume
                </span>
                <span className="text-green-600 font-bold text-xl">Pro</span>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold" style={{ color: 'var(--color-title-primary)' }}>
              {t('step_into_your')} <br/>
              <span className="text-brand-primary">{t('next_role')}</span>
            </h2>
          </div>

          {/* <div className="relative z-10 grid grid-cols-2 gap-5 my-8">
            {templates.map((tpl) => (
              <div key={tpl.id} onClick={() => navigate(`/builder/${tpl.id}`)} className="group cursor-pointer">
                <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 group-hover:border-brand-primary/40 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img src={`/previews/${tpl.id}.png`} alt={tpl.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">{tpl.name}</p>
              </div>
            ))}
          </div> */}
<div className="relative z-10 grid grid-cols-2 gap-6 my-8">
  {templates.map((tpl) => (
    <div 
      key={tpl.id} 
      onClick={() => navigate(`/builder/${tpl.id}`)} 
      className="group relative cursor-pointer"
    >
      {/* Main Card Container */}
      <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-500 ease-out shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-primary/20 group-hover:-translate-y-2 group-hover:border-brand-primary/50">
        
        {/* Subtle Gradient Overlay (Appears on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
          <span className=" text-[10px] font-bold uppercase tracking-tighter mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Click to Customize
          </span>
        </div>

        {/* Image with Zoom Effect */}
        <img 
          src={`/previews/${tpl.id}.png`} 
          alt={tpl.name} 
          className="w-full h-full object-cover object-top opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out" 
        />
      </div>

      {/* Label Styling */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div>
          <p className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider group-hover:text-brand-primary transition-colors">
            {tpl.name}
          </p>
          <div className="h-0.5 w-0 group-hover:w-full bg-brand-primary transition-all duration-300 rounded-full" />
        </div>
        
        {/* Small "New" or "Pro" tag (Optional) */}
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold border border-slate-200 dark:border-slate-700">
          FREE
        </span>
      </div>
    </div>
  ))}
</div>
          <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-medium">{t('login_to_explore_more')}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
<div className="lg:w-[50%] bg-(--color-card-right) p-10 flex flex-col justify-between relative overflow-hidden border-r border-(--color-border-subtle)">     
       <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight"  style={{ color: 'var(--color-title-primary)' }}>
              {t('sign_in')}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('welcome_back_please_enter_your_details')}</p>
            </div>

            {/* Social Logins */}
            <div className="flex items-center gap-3 mb-8 w-full max-w-[350px] mx-auto">
              <div className="flex-1 transform hover:scale-[1.01] transition-all">
                <GoogleAuthButton />
              </div>

              <button 
                type="button" 
                onClick={() => handleSocialClick('GitHub')} 
                className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
              <span className="mx-4 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">{t('or')}</span>
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && <ErrorMessage message={error} />}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('email')}</label>
                <input
                  type="email"
                  placeholder="e.g. alex@work.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-300 focus:bg-white dark:focus:bg-slate-700 focus:border-brand-primary/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('password')}</label>
                  <Link to="/forgot-password" className="text-[10px] text-brand-primary font-bold hover:underline">
                    {t('forgot')}
                  </Link>
                </div>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? t("authenticating") : t("sign_in")}
              </button>
              
            </form>
            

            <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
              {t('dont_have_an_account')} <Link to="/register" className="text-brand-primary font-bold hover:underline">{t('sign_up_free')}</Link>
            </p>

               {/* This flex container keeps them side-by-side and prevents overlapping */}
    
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}