import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith('en') ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        type="button"
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg shadow-slate-900/20 group"
      >
        <Languages size={18} className="text-slate-400 group-hover:text-green-400 transition-colors" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          {i18n.language?.startsWith('en') ? 'Hindi' : 'English'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;