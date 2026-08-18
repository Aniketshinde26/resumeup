import type {GridBackgroundProps} from "../types/layoutprops";

const GridBackground = ({ 
  children, 
  dotColor = "rgba(128,128,128,0.15)",
  dotSize = "2px", 
  gapSize = "40px" 
}: GridBackgroundProps) => {
  return (
  
    <div className="relative min-h-screen w-[100vw] left-50/97 -translate-x-1/2 bg-[var(--color-brand-surface)] transition-colors duration-300 isolate overflow-x-hidden">
      
   
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}, transparent ${dotSize})`,
          backgroundSize: `${gapSize} ${gapSize}`,
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;