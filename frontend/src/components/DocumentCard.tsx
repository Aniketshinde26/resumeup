import { useEffect, useRef, useState } from "react";

interface DocumentCardProps {
  title: string;
  updatedAt?: string;
  id: string | number;
  type: "resume" | "coverletter";
  preview?: string;
  showContent?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function DocumentCard({
  title,
  updatedAt,
  id,
  type,
  preview,
  showContent = false,
  onClick,
  onDelete,
}: DocumentCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Standard A4 ratio calculation based on your original 790px width
        const newScale = containerWidth / 790;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [showContent]);

  // Determine the preview URL based on type
  const previewUrl = type === "resume" ? `/resume/preview/${id}` : `/cover-letters/preview/${id}`;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-md cursor-pointer group relative flex flex-col h-full"
    >
      {/* PREVIEW CONTAINER */}
      <div
        ref={containerRef}
        className="bg-slate-50 rounded-lg aspect-[1/1.41] mb-5 border border-slate-200 overflow-hidden relative shadow-sm flex items-center justify-center"
      >
        {showContent && id ? (
          <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
            <iframe
              src={previewUrl}
              title={title}
              className="absolute border-none pointer-events-none text-slate-100"
              style={{
                width: "790px",
                height: "1118px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                top: 0,
              }}
            />
            {/* Overlay to prevent iframe interaction while in card mode */}
            <div className="absolute inset-0 z-30 bg-transparent" />
          </div>
        ) : (
          <img
            src={preview || "https://via.placeholder.com/300x424/f1f5f9/64748b?text=No+Preview"}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* INFO FOOTER */}
      <div className="flex justify-between items-end mt-auto">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 truncate group-hover:text-green-500 transition-colors text-sm">
            {title || `Untitled ${type === "resume" ? "Resume" : "Cover Letter"}`}
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">
            Edited {updatedAt ? new Date(updatedAt).toLocaleDateString() : "Recently"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all md:opacity-0 group-hover:opacity-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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