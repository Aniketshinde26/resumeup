import { Link } from "react-router-dom"; 
import type { AuthFooterProps } from "../../types/layoutprops";

export const AuthFooter = ({ label, linkText, href }: AuthFooterProps) => (
  <p className="text-sm text-text-muted">
    {label} 
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
