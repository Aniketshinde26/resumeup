// src/components/PasswordInput.tsx

import { useState, type ChangeEvent } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // 🔥 Add this
  className?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  required = false,
  disabled = false, // 🔥 Add this with default value
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled} // 🔥 Pass it to the input
        className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" // 🔥 Add disabled styles
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled} // 🔥 Also disable the toggle button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </button>
    </div>
  );
}
