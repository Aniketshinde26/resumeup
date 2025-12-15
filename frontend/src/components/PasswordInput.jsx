import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  required = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full p-2 pr-10 border rounded
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-500 hover:text-gray-700"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
