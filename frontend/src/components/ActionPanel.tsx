import React from 'react';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface ActionPanelProps {
  className?: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Changed px-30 to a responsive px-3 sm:px-4 and added transition for smooth resizing */}
      <div className="flex items-center gap-1.0 sm:gap-2 bg-(--color-card-bg) border border-(--color-border-subtle) px-3 sm:px-30 py-1.5 sm:py-1 rounded-3xl shadow-sm backdrop-blur-md w-fit transition-all duration-300">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-(--color-border-subtle)" aria-hidden="true" />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default ActionPanel;