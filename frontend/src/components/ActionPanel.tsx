import React from 'react';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";


interface ActionPanelProps {
  className?: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ className = "" }) => {
  return (
    <div className={`relative z-[10] w-full flex justify-end items-center mb-2 ${className}`}>
      <div className="flex items-center gap-2  bg-(--color-card-bg) border border-(--color-border-subtle) px-120 py-2 rounded-2xl shadow-sm backdrop-blur-md w-fit">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-(--color-card-bg) " aria-hidden="true" />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default ActionPanel;