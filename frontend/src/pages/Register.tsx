import { useRegister } from "../hooks/useRegister";
import PasswordInput from "../components/PasswordInput";
import { ErrorMessage } from "../components/ui";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Link } from "react-router-dom";
import { useGithubAuth } from "../hooks/useGithubAuth";
import { useTranslation } from "react-i18next";
import ActionPanel from "../components/ActionPanel";
import GridBackground from "../layouts/Gridbackground";

export default function Register() {
  const { t } = useTranslation('translation', { keyPrefix: 'register' });
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
  const { handleSocialClick } = useGithubAuth();

  return (
    <>
    
    <GridBackground>
     
<div className="min-h-screen w-full p-4 sm:p-8 max-w-7xl mx-auto flex items-center justify-center font-sans"> 
         <div className="w-full flex-col">
          
          <div className="flex flex-col lg:flex-row w-full min-h-[700px] overflow-hidden rounded-[2rem] bg-(--color-card-bg) border border-(--color-border-subtle) shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">        
            
            {/* LEFT SECTION: BRAND & SHOWCASE */}
            <div className="lg:w-[50%] bg-slate-100 p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
              {/* <div className="absolute inset-0 opacity-[0.7]" style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 2px)`, backgroundSize: '24px 24px' }} /> */}
              
              {/* Glowing Blobs */}
              <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-blue-500/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Logo */}
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
                  {t('build_your_future')} <br /> 
                  <span className="text-brand-primary">{t('piece_by_piece')}</span>
                </h2>
              </div>

              {/* Decorative Mockup Graphics Area */}
              <div className="mt-12 mb-8 relative px-4 hidden sm:block">
                {/* Main Progress Card */}
                <div className="relative z-10 bg-white rounded-2xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-200/60 rotate-[-2deg] mb-4 max-w-sm mx-auto">
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
                      <div className="h-full w-[75%] bg-brand-primary rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-1.5 w-[30%] bg-slate-100 rounded-full" />
                      <div className="h-1.5 w-[15%] bg-slate-100 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphism Stats badge */}
                <div className="absolute -top-6 left-[5%] z-30 bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-2xl shadow-slate-200/50 rotate-[4deg] w-48">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">ATS Match</p>
                      <p className="text-lg font-black text-slate-900">92.8%</p>
                    </div>
                  </div>
                </div>

                {/* Contextual Tag */}
                <div className="absolute -bottom-2 right-[5%] z-30 bg-slate-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  {t('optimize_your_job_hunt')}
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-medium">ResumePro — Professional Toolkit</p>
              </div>
            </div>

            {/* RIGHT SECTION: FORM CONTAINER */}
            <div className="lg:w-[50%] bg-(--color-card-right) p-6 sm:p-10 relative border-r border-(--color-border-subtle) flex flex-col justify-center items-center"> 
              
              {/* Form Container - Perfectly centered layout */}
              <div className="w-full max-w-sm mx-auto flex flex-col justify-center my-auto py-6">
                
                {/* Action Panel - Centered and shifted higher flow */}
                <div className="flex justify-center mb-5 -mt-4">
                  <ActionPanel />
                </div>

                {/* Heading Section */}
                <div className="mb-8 text-center lg:text-left">
                  <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--color-sign-in)' }}>
                    {t('create_account')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {t('get_started_with_your_free_account_today')}
                  </p>
                </div>

                {/* Social Registration Rows */}
                <div className="flex items-center gap-3 mb-6 w-full">
                  <div className="flex-1 transform hover:scale-[1.01] transition-all">
                    <GoogleAuthButton />
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => handleSocialClick('GitHub')} 
                    className="flex-1 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-primary hover:border-brand-primary/30 transition-all uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="relative flex items-center mb-6">
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                  <span className="mx-4 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
                    {t('or_register_with_email')}
                  </span>
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                </div>

                {/* Form Input Block */}
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && <ErrorMessage message={error} />}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t('full_name')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={fullname}
                      required
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-300 focus:bg-white dark:focus:bg-slate-700 focus:border-brand-primary/50 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@work.com"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-300 focus:bg-white dark:focus:bg-slate-700 focus:border-brand-primary/50 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t('password')}
                    </label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoading ? t("creating_account") : t("create_account")}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-sign-in)' }}>
                  {t('already_have_an_account')}{' '}
                  <Link to="/login" className="text-inherit font-bold underline">
                    {t('sign_in')}
                  </Link>
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
            
    </GridBackground>
  
    </>
  );
}