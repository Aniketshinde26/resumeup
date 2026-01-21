import { useEffect, useRef, useState } from "react";

interface ResumeCardProps {
  title: string;
  updatedAt: string;
  resumeData?: any;
  showContent?: boolean;
  preview?: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function ResumeCard({
  title,
  updatedAt,
  resumeData,
  preview,
  showContent = false,
  onClick,
  onDelete,
}: ResumeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28); // Fallback scale

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Calculate scale: Container Width / Original Iframe Width (790px)
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = containerWidth / 790;
        setScale(newScale);
      }
    };

    // Calculate on mount and whenever the window resizes
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [showContent]);

  return (
    <div
      onClick={onClick}
      className="bg-card-bg border border-border-subtle rounded-xl p-8 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
    >
      {/* SHOWCASE CONTAINER */}
      <div 
        ref={containerRef}
        className="bg-white rounded-lg aspect-[1/1.41] mb-6 border border-slate-300 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all flex items-center justify-center"
      >
        {showContent && resumeData?.id ? (
          <div className="relative w-full h-full bg-white pointer-events-none flex items-center justify-center">
            <iframe
              src={`/resume/preview/${resumeData.id}`}
              title={title}
              className="absolute border-none"
              style={{
                width: "790px",
                height: "1118px", 
                transform: `scale(${scale})`, // Use the dynamic scale
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 z-10" />
          </div>
        ) : (
          <img
            src={preview}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x424/f1f5f9/64748b?text=No+Preview";
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      </div>

      {/* INFO FOOTER */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-main truncate group-hover:text-brand-primary transition-colors text-sm">
            {title || "Untitled Resume"}
          </h3>
          <p className="text-[10px] text-text-muted mt-0.5">
            Edited {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-10 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}