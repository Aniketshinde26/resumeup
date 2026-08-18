import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GridBackground from "../layouts/Gridbackground";

export default function ForgotPassword() {
  const { email, setEmail, message, error, loading, handleForgotPassword } = useForgotPassword();
  const { t } = useTranslation('translation', { keyPrefix: 'forgotpassword' });

  return (
    <GridBackground>
      <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center font-sans">
        
        <div className="w-full max-w-xl relative overflow-hidden rounded-[2.5rem] bg-(--color-card-bg) border border-(--color-border-subtle) shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] p-10 sm:p-14">
          
          <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-8 text-center relative z-10">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div className="flex items-center gap-0 tracking-tight text-xl">
                <span className="font-bold" style={{ color: 'var(--color-brand-name)' }}>
                  Resume
                </span>
                <span className="text-green-600 font-bold">Pro</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--color-sign-in)' }}>
              {t('reset_password')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
              {t('enter_email_receive_reset_link')}
            </p>
          </div>

          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm flex items-start gap-3 relative z-10">
            <span className="text-lg leading-none">⚠️</span>
            <div className="space-y-1">
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                {t('limit_notice_title', 'Security Notice')}
              </p>
              <p className="text-slate-700 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
                {t(
                  'limit_notice_desc',
                  'To prevent spam, password reset requests are limited to once every 24 hours per account.'
                )}
              </p>
            </div>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enter_email')}
                className="w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-3.5 text-base text-slate-900 dark:text-white placeholder:text-slate-300 focus:bg-white dark:focus:bg-slate-700 focus:border-brand-primary/50 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 rounded-2xl bg-brand-primary py-4 text-base font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? t('sending') : t('send_reset_link')}
            </button>
          </form>

          {message && (
            <p className="mt-5 text-sm text-green-600 font-medium text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 relative z-10">
              {message === "Reset link sent to your email!" ? t('reset_link_sent_success') : message}
            </p>
          )}
          {error && (
            <p className="mt-5 text-sm text-red-600 font-medium text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 relative z-10">
              {error}
            </p>
          )}

          <p className="mt-8 text-center text-base relative z-10" style={{ color: 'var(--color-sign-in)' }}>
            {t('remembered_it')}{' '}
            <Link to="/login" className="text-inherit font-bold underline">
              {t('back_to_sign_in')}
            </Link>
          </p>

        </div>
      </div>
    </GridBackground>
  );
}