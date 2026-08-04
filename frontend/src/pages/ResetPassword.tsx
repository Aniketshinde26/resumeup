import { useResetPassword } from "../hooks/useResetPassword";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GridBackground from "../layouts/Gridbackground";

export default function ResetPassword() {
  const { password, setPassword, confirmPassword, setConfirmPassword, message, error, loading, handleResetPassword } = useResetPassword();
  const { t } = useTranslation('translation', { keyPrefix: 'resetpassword' });

  return (
    <GridBackground>
      <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center font-sans">
        
        {/* Expanded Centered Card */}
        <div className="w-full max-w-xl relative overflow-hidden rounded-[2.5rem] bg-(--color-card-bg) border border-(--color-border-subtle) shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] p-10 sm:p-14">
          
          {/* Ambient Glow Effects */}
          <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Logo */}
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
              {t('new_password', 'New Password')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
              {t('set_new_password_desc', 'Set your new account password below to regain access.')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                {t('new_password_label', 'New Password')}
              </label>
              <PasswordInput 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                {t('confirm_password_label', 'Confirm Password')}
              </label>
              <PasswordInput 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 rounded-2xl bg-brand-primary py-4 text-base font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? t('updating', 'Updating...') : t('reset_password_btn', 'Reset Password')}
            </button>
          </form>

          {/* Alerts with Dark Theme Support */}
          {message && (
            <div className="mt-5 text-sm text-green-600 dark:text-green-400 font-medium text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 relative z-10">
              {message} {t('redirecting', 'Redirecting...')}
            </div>
          )}
          {error && (
            <div className="mt-5 text-sm text-red-600 dark:text-red-400 font-medium text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 relative z-10">
              {error}
            </div>
          )}

          {/* Footer Link */}
          <p className="mt-8 text-center text-base relative z-10" style={{ color: 'var(--color-sign-in)' }}>
            {t('back_to', 'Back to')}{' '}
            <Link to="/login" className="text-inherit font-bold underline">
              {t('sign_in', 'Sign In')}
            </Link>
          </p>

        </div>
      </div>
    </GridBackground>
  );
}