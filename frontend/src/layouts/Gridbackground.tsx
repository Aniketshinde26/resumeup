import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
  gridColor?: string; // Optional: pass a custom color like 'rgba(0,0,0,0.1)'
  cellSize?: string;  // Optional: pass a custom size like '30px'
}

const GridBackground = ({ 
  children, 
  gridColor = "rgba(128,128,128,0.08)", 
  cellSize = "50px" 
}: GridBackgroundProps) => {
  return (
    <div 
      className="relative min-h-screen w-full bg-[var(--color-brand-surface)] transition-colors duration-300"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize} ${cellSize}`,
      }}
    >
      {/* This ensures the content sits above the background */}
      <div className="relative z-5">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;