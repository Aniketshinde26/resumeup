import type { ErrorProps } from "../../types/layoutprops";

export const ErrorMessage = ({ message }: ErrorProps) => (
  <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm transition-all animate-in fade-in slide-in-from-top-2">
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
    <span className="font-medium">{message}</span>
  </div>
);
