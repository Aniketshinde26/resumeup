import { useEffect, useRef, useState } from "react";

interface CoverLetterCardProps {
  title: string;
  updatedAt?: string;
  coverLetterData?: any;
  showContent?: boolean;
  preview?: string;
  onClick?: () => void;
  onDelete?: () => void;
}


export default function CoverLetterCard({
  title,
  updatedAt,
  coverLetterData,
    preview,
    showContent = false,
    onClick,
    onDelete,}: CoverLetterCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

    useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;    
        const newScale = containerWidth / 790;
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [showContent]);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-md cursor-pointer group relative flex flex-col h-full"
      >
        <div 
        ref={containerRef}
        className="bg-slate-50 rounded-lg aspect-[1/1.41] mb-5 border border-slate-200 overflow-hidden relative shadow-sm flex items-center justify-center"
        >
            {showContent && coverLetterData?.id ? (
          <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
            <iframe 
                src={`/coverletter/preview/${coverLetterData.id}`}
                title={title}
                className="absolute border-none pointer-events-none"
                style={{
                    width: "790px",
                    height: "1118px",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                }}
            />
            <div className="absolute inset-0 z-30 bg-transparent" />
          </div>
        ) : (
            <img
                src={preview}
                alt={title}
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500"    
                onError = {(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                }}
/>  )}
        </div>

        <div className="flex-justify-between items-end mt-auto">
            <div className = "flex-1 min-w-0">
<h3 className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors text-sm">
                {title||"Untitled Cover Letter"} 
</h3>
<p className = "text-[10px] text-slate-400 mt-1 font-medium">
                 Edited{updatedAt? new Date(updatedAt).toLocaleDateString() : "Recently"}
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                }}
                className="ml-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500 hovver:bg-red-50 rounded-lg transition-all md:opacity-0 group-hover:opacity-100"
>
     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
</button>
</div>
    </div>
  );
}
        