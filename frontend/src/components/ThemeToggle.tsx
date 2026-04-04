import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
console.log("Current Theme in Toggle:", theme);
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 p-2 rounded-lg transition-all duration-300 
                 bg-gray-100 hover:bg-gray-200 
                 dark:bg-slate-800 dark:hover:bg-slate-700"
    >

<span className="flex items-center gap-2 text-slate-800 dark:text-yellow-400">
  {theme === "light" ? "🌙" : "☀️"} 
  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    {theme === "light" ? "Dark Mode" : "Light Mode"}
  </span>
</span>
    </button>
  );
};

export default ThemeToggle;