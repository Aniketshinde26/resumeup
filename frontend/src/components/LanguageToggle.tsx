import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages, ChevronDown, Check } from "lucide-react";

type LanguageToggleProps = {
  variant?: "pill" | "panel";
};

const LanguageSelector = ({ variant = "pill" }: LanguageToggleProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isPanel = variant === "panel";

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'nep', label: 'नेपाली' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguageLabel = languages.find(l => i18n.language?.startsWith(l.code))?.label || 'English';

  const buttonClass = isPanel
    ? "flex items-center h-12 px-3 w-full rounded-xl transition-all duration-300 dark:bg-slate-500 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300"
    : "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-slate-900/20 group";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={buttonClass}
      >
        {isPanel ? (
          <>
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <Languages size={18} />
            </div>
            <span className="ml-5 text-xs font-black uppercase transition-opacity duration-300">
              {currentLanguageLabel}
            </span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        ) : (
          <>
            <Languages size={18} className="text-slate-400 group-hover:text-green-400 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {currentLanguageLabel}
            </span>
            <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {lang.label}
              {i18n.language?.startsWith(lang.code) && (
                <Check size={14} className="text-green-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
