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
        // 🔑 "type" must stay "password" for the browser eye to appear
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-md border border-slate-200
          bg-slate-50 px-4 py-2.5 text-sm
          focus:bg-white focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-500/20
          outline-none transition
          ${inputClassName}
        `}
      />
    </div>
  );
}
