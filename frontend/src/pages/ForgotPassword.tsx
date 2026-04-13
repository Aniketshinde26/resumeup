import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { email, setEmail, message, error, loading, handleForgotPassword } = useForgotPassword();

return (
  <div className="min-h-screen w-full flex items-center justify-center bg-(--color-brand-firstlayer) p-4 font-sans">
    <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-(--color-card-bg) border border-(--color-border-subtle) shadow-xl p-10">
      <div className="mb-8 text-center">
        {/* Changed text color to use variable */}
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--color-sign-in)' }}>
          Reset Password
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Enter your email to receive a reset link.
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. alex@work.com"
            /* Added dark:bg-slate-800 and dark:text-white */
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-300 focus:bg-white dark:focus:bg-slate-700 focus:border-brand-primary/50 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Logic for Alerts: Adding dark mode support for messages */}
      {message && (
        <p className="mt-4 text-xs text-green-600 font-medium text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 text-xs text-red-600 font-medium text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
          {error}
        </p>
      )}

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Remembered it?{' '}
        <Link to="/login" className="text-brand-primary font-bold hover:underline">
          Back to Sign in
        </Link>
      </p>
    </div>
  </div>
);
}