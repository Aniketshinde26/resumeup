// Ensure it looks like this
import type { AuthFooterProps } from "./AuthFooterProps";
export const AuthFooter = ({ label, linkText, href }: AuthFooterProps) => (
  <p className="...">
    {label}{" "}
    <a href={href} className="...">
      {linkText}
    </a>
  </p>
); // No extra characters after this!
