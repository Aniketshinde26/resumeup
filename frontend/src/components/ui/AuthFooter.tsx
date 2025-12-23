import { Link } from "react-router-dom"; // 🔑 1. Import Link
import type { AuthFooterProps } from "./AuthFooterProps";

export const AuthFooter = ({ label, linkText, href }: AuthFooterProps) => (
  <p className="text-sm text-text-muted">
    {label} {/* 🔑 2. Change <a> to <Link> and 'href' to 'to' */}
    <Link
      to={href}
      className="
        ml-1
        inline-flex items-center
        rounded-md
        bg-brand-surface
        px-2 py-0.5
        font-semibold
        text-brand-primary
        hover:bg-indigo-100
        transition
      "
    >
      {linkText}
    </Link>
  </p>
);
