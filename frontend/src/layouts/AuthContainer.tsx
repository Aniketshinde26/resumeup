import type { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100">
      {/* Page padding */}
      <div className="p-8">
        {/* Container alignment */}
        <div className="flex items-start justify-start">{children}</div>
      </div>
    </div>
  );
}
