import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center h-12 px-3 w-full rounded-xl transition-all duration-300  
                 dark:bg-slate-500 dark:hover:bg-slate-900
                 text-slate-600 dark:text-slate-300"
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <span className="text-lg">
          {theme === "light" ? "☀️" : "🌙"}
        </span>
      </div>

      <span className="ml-5 text-xs font-black uppercase opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;