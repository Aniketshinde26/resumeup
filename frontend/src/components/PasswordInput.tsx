import { type ChangeEvent } from "react";

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
  return (
    <div className="relative w-full">
      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-xl border border-black/10
          bg-white px-4 py-3 text-sm
          placeholder:text-gray-700
          focus:bg-white/[0.05] focus:border-brand-primary/50
          outline-none transition-all
          disabled:opacity-10 disabled:cursor-not-allowed
          ${inputClassName}
        `}
      />
    </div>
  );
}