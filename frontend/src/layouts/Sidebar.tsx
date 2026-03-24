import { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Search, PenTool, LogOut, Languages, ChevronRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'sidebar' });
  
  // --- New Dropdown State ---
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'nep', label: 'नेपाली' }
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: t('home'), icon: <LayoutDashboard size={22} />, path: '/home' },
    { name: t('my_resumes'), icon: <FileText size={22} />, path: '/my-resumes' },
    { name: t('ats_check'), icon: <Search size={22} />, path: '/ats-check' },
    { name: t('cover_letter'), icon: <PenTool size={22} />, path: '/cover-letter' },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error during server logout:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      <aside className="h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out group 
                        w-[80px] hover:w-[280px] shrink-0 z-[50] shadow-xl shadow-slate-200/50">
        
        {/* LOGO SECTION */}
        <div className="h-24 flex items-center px-[26px] overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-slate-900/20">
            <span className="text-white font-bold text-xs uppercase">R</span>
          </div>
          <div className="ml-4 flex items-center gap-0 tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-slate-900 font-bold text-xl">Resume</span>
            <span className="text-green-600 font-bold text-xl">Up</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-12 px-3 rounded-xl transition-all relative whitespace-nowrap overflow-hidden
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="ml-5 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="p-4 border-t border-slate-100 shrink-0 space-y-1 relative" ref={langRef}>
          
          {/* MULTI-LANGUAGE DROPDOWN */}
          <div className="relative">
            {isLangOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-bottom-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <span className={i18n.language.startsWith(lang.code) ? "font-bold text-slate-900" : ""}>
                      {lang.label}
                    </span>
                    {i18n.language.startsWith(lang.code) && <Check size={14} className="text-green-600" />}
                  </button>
                ))}
              </div>
            )}

            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center h-12 px-3 w-full transition-colors whitespace-nowrap overflow-hidden rounded-xl
                ${isLangOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-blue-600'}`}
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <Languages size={20} />
              </div>
              <div className="ml-5 flex items-center justify-between flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-black uppercase tracking-widest">
                  {languages.find(l => i18n.language.startsWith(l.code))?.label || 'Language'}
                </span>
                <ChevronRight size={14} className={`transition-transform ${isLangOpen ? 'rotate-[-90deg]' : ''}`} />
              </div>
            </button>
          </div>

          {/* LOGOUT */}
          <button 
            onClick={handleLogout}
            className="flex items-center h-12 px-3 w-full text-slate-400 hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </div>
            <span className="ml-5 text-xs font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t('logout')}
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC]">
        <div className="p-10 max-w-7xl mx-auto min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
}