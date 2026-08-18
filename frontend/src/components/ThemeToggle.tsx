import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center h-12 px-3 w-full rounded-xl transition-all duration-300 
                 bg-slate-100/50 hover:bg-slate-200 
                 dark:bg-slate-800/50 dark:hover:bg-slate-700
                 text-slate-600 dark:text-slate-300"
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <span className="text-lg">
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </div>

      <span className="ml-5 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;