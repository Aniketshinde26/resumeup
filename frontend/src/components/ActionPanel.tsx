import React from 'react';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface ActionPanelProps {
  className?: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ className = "" }) => {
  return (
   
    <div className={`relative z-[100] w-full flex justify-end items-center mb-4 ${className}`}>
      <div className="flex items-center gap-103 bg-(--color-card-bg) border border-(--color-border-subtle) px-4 py-2 rounded-2xl shadow-sm backdrop-blur-md">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default ActionPanel;