import { useState, type ChangeEvent } from "react";

interface PasswordInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  disabled = false,
  inputClassName = "",
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative w-full">
      <input
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-xl border border-black/10
          bg-white px-4 py-3 pr-11 text-sm
          placeholder:text-gray-700
          focus:bg-white/[0.05] focus:border-brand-primary/50
          outline-none transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${inputClassName}
        `}
      />
      
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black focus:outline-none disabled:opacity-0"
      >
        {isVisible ? (
          // Eye Off Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88l-3.29-3.29m7.53 7.53l3.29 3.29M3 3l18 18M10.584 10.584a2 2 0 1 0 2.828 2.828M14.474 9.44a9 9 0 0 0-14.474 2.56 8.999 8.999 0 0 0 5.483 4.79M17.023 14.996c1.711-1.297 3.467-3.436 4.477-5.996-1.759-4.476-5.39-7-9.5-7a8.742 8.742 0 0 0-3.136.572"/></svg>
        ) : (
          // Eye Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        )}
      </button>
    </div>
  );
}