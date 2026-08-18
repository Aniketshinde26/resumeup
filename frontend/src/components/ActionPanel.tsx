import React from 'react';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import type { ActionPanelProps } from "../types/layoutprops";



const ActionPanel: React.FC<ActionPanelProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
    
<div className="flex items-center gap-2 bg-(--color-card-bg) border border-(--color-border-subtle) px-3 py-1.5 rounded-3xl shadow-sm backdrop-blur-md w-fit transition-all duration-300">
  <ThemeToggle />
  <div className="h-4 w-[1px] bg-(--color-border-subtle)" aria-hidden="true" />
  <LanguageToggle />
</div>
    </div>
  );
};

export default ActionPanel;