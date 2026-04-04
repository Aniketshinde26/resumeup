import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference on initial load
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

useEffect(() => {
  // Target the very top <html> element
  const root = document.documentElement;
  
  console.log("DOM Update Triggered. Target Theme:", theme);

  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark'); // Extra backup for some CSS setups
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
  
  localStorage.setItem('theme', theme);
}, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);