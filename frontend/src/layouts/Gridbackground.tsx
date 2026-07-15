// import React from 'react';

// interface GridBackgroundProps {
//   children: React.ReactNode;
//   gridColor?: string; 
//   cellSize?: string;  
// }

// const GridBackground = ({ 
//   children, 
//   gridColor = "rgba(128,128,128,0.08)", 
//   cellSize = "50px" 
// }: GridBackgroundProps) => {
//   return (
//     /* 
//       THE FIX: 
//       - 'w-[100vw]' forces the container to match the exact window width.
//       - 'left-1/2 -translate-x-1/2' centers the element perfectly within the viewport,
//         effectively counter-acting any parent layout 'mx-auto' or padding constraints.
//     */
//     <div className="relative min-h-screen w-[100vw] left-50/95 -translate-x-1/2 bg-[var(--color-brand-surface)] transition-colors duration-300 isolate overflow-x-hidden">
      
//       {/* The grid pattern layer now matches the full expanded window width */}
//       <div 
//         className="absolute inset-0 pointer-events-none z-0"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, ${gridColor} 1px, transparent 1px),
//             linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
//           `,
//           backgroundSize: `${cellSize} ${cellSize}`,
//         }}
//       />

//       {/* The content layer stays centered natively on top */}
//       <div className="relative z-10 w-full h-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default GridBackground;

import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
  dotColor?: string; // Replaced gridColor with dotColor
  dotSize?: string;  // Control the size of individual dots (e.g., '1.5px', '2px')
  gapSize?: string;  // Control the spacing between dots (analogous to cellSize, e.g., '30px', '40px')
}

const GridBackground = ({ 
  children, 
  dotColor = "rgba(128,128,128,0.15)", // Tweak opacity to make them stand out or blend in
  dotSize = "2px", 
  gapSize = "40px" 
}: GridBackgroundProps) => {
  return (
    /* 
      Your breakout wrapper remains completely untouched so your layouts stay perfectly aligned 
    */
    <div className="relative min-h-screen w-[100vw] left-50/95 -translate-x-1/2 bg-[var(--color-brand-surface)] transition-colors duration-300 isolate overflow-x-hidden">
      
      {/* 
        The Dot Pattern Layer: 
        Using radial-gradient creates clean circles (dots) instead of long intersecting lines.
      */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}, transparent ${dotSize})`,
          backgroundSize: `${gapSize} ${gapSize}`,
        }}
      />

      {/* The content layer stays centered natively on top */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;