import { useGithubAuth } from "../hooks/useGithubAuth";

export default function GithubCallback() {
  // All the logic is tucked away inside this hook
  useGithubAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium tracking-tight">
        Finalizing your secure connection...
      </p>
    </div>
  );
}