import { useResetPassword } from "../hooks/useResetPassword";
import PasswordInput from "../components/PasswordInput";

export default function ResetPassword() {
  const { password, setPassword, confirmPassword, setConfirmPassword, message, error, loading, handleResetPassword } = useResetPassword();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-xl p-10">
        <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-2">New Password</h1>
        <p className="text-slate-500 text-sm text-center mb-8">Set your new account password below.</p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
            <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {message && <div className="mt-6 p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-xs font-bold text-center">{message} Redirecting...</div>}
        {error && <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center">{error}</div>}
      </div>
    </div>
  );
}