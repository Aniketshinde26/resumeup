// import { useTranslation } from "react-i18next";
// import { Languages } from "lucide-react";

// const LanguageToggle = () => {
//   const { i18n } = useTranslation();

//   const toggleLanguage = () => {
//     const newLang = i18n.language?.startsWith('en') ? 'hi' : 'en';
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <div className="absolute top-6 right-6 z-50">
//       <button
//         type="button"
//         onClick={toggleLanguage}
//         className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-slate-900/20 group"
//       >
//         <Languages size={18} className="text-slate-400 group-hover:text-green-400 transition-colors" />
//         <span className="text-[10px] font-black uppercase tracking-widest">
//           {i18n.language?.startsWith('en') ? 'Hindi' : 'English'}
//         </span>
//       </button>
//     </div>
//   );
// };

// export default LanguageToggle;


import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages, ChevronDown, Check } from "lucide-react";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'nep', label: 'नेपाली' }
  ];

  // Close dropdown when clicking outside
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

  return (
    <div className="absolute top-6 right-6 z-50" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-slate-900/20 group"
      >
        <Languages size={18} className="text-slate-400 group-hover:text-green-400 transition-colors" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {currentLanguageLabel}
        </span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
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