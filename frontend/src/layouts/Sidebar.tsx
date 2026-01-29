import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Search, PenTool, LogOut } from "lucide-react";
import api from "../api/axios";
export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: <LayoutDashboard size={22} />, path: '/home' },
    { name: 'My Resumes', icon: <FileText size={22} />, path: '/my-resumes' },
    { name: 'ATS Scorer', icon: <Search size={22} />, path: '/ats-check' },
    { name: 'Cover Letter', icon: <PenTool size={22} />, path: '/cover-letter' },
  ];

 const handleLogout = async () => {
    try {
      // 3. Call the backend logout endpoint
      // This allows the server to run res.clearCookie() and update the DB
      await api.post("/auth/logout");
      
      console.log("Logged out from server successfully");
    } catch (error) {
      // Even if the server call fails (e.g., internet out), we still clean up the client
      console.error("Error during server logout:", error);
    } finally {
      // 4. Cleanup local state
      localStorage.removeItem("token");
      
      // 5. Redirect
      navigate("/login");
    }
  };

  return (
    // We use 'flex' on the parent to keep main content next to sidebar
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      
      {/* SIDEBAR CONTAINER */}
      <aside className="h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out group 
                        w-[80px] hover:w-[280px] shrink-0 z-[50] shadow-xl shadow-slate-200/50">
        
        {/* LOGO SECTION */}
        <div className="h-24 flex items-center px-[26px] overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-slate-900/20">
            <span className="text-white font-bold text-xs uppercase">R</span>
          </div>
          {/* text-opacity-0 and group-hover:text-opacity-100 prevents flickering */}
          <span className="ml-4 font-black text-xl text-slate-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ResumeUp
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
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

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-100 shrink-0 overflow-hidden">
          <button 
            onClick={handleLogout}
            className="flex items-center h-12 px-3 w-full text-slate-400 hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </div>
            <span className="ml-5 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      {/* Because the parent is 'flex', this will naturally fill the rest of the screen */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC]">
        <div className="p-10 max-w-7xl mx-auto min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
}