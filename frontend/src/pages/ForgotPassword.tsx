import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { email, setEmail, message, error, loading, handleForgotPassword } = useForgotPassword();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 font-sans text-slate-900">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reset Password</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your email to receive a reset link.</p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@work.com"
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-brand-primary/50 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-primary py-3 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="mt-4 text-xs text-green-600 font-medium text-center bg-green-50 p-3 rounded-lg border border-green-100">{message}</p>}
        {error && <p className="mt-4 text-xs text-red-600 font-medium text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

        <p className="mt-8 text-center text-sm text-slate-500">
          Remembered it? <Link to="/login" className="text-brand-primary font-bold hover:underline">Back to Sign in</Link>
        </p>
      </div>
    </div>
  );
}