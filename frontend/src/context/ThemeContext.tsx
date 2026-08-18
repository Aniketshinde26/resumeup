import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

useEffect(() => {
  const root = document.documentElement;
  

  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark'); 
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