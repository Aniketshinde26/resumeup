import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Search, PenTool, LogOut, Languages } from "lucide-react"; // Added Languages icon
import { useTranslation } from "react-i18next"; // Import hook
import api from "../api/axios";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation',{keyPrefix:'sidebar'}); 

  // Move menuItems inside the component so they update when language changes
  const menuItems = [
    { name: t('home'), icon: <LayoutDashboard size={22} />, path: '/home' },
    { name: t('my_resumes'), icon: <FileText size={22} />, path: '/my-resumes' },
    { name: t('ats_check'), icon: <Search size={22} />, path: '/ats-check' },
    { name: t('cover_letter'), icon: <PenTool size={22} />, path: '/cover-letter' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

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

        {/* BOTTOM SECTION (LANGUAGE + LOGOUT) */}
        <div className="p-4 border-t border-slate-100 shrink-0 space-y-1">
          
          {/* LANGUAGE TOGGLE */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center h-12 px-3 w-full text-slate-400 hover:text-blue-600 transition-colors whitespace-nowrap overflow-hidden group/lang"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <Languages size={20} />
            </div>
            <div className="ml-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-black uppercase tracking-widest">
                {i18n.language === 'en' ? 'Hindi' : 'English'}
              </span>
            </div>
          </button>

          {/* LOGOUT */}
          <button 
            onClick={handleLogout}
            className="flex items-center h-12 px-3 w-full text-slate-400 hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </div>
            <span className="ml-5 text-xs font-black0 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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