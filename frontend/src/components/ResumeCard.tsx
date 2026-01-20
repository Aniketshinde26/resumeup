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
  return (
    <div
      onClick={onClick}
      className="bg-card-bg border border-border-subtle rounded-xl p-8 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
    >
      {/* SHOWCASE CONTAINER */}
      <div className="bg-white rounded-lg h-50 mb-10 border border-slate-300 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
        {showContent && resumeData?.id ? (
          /* We removed aspect-[1/1.414] and set w-full h-full to fill the parent */
          <div className="relative w-full h-full pointer-events-none select-none bg-white">
            <iframe
              src={`/resume/preview/${resumeData.id}`}
              title={title}
              className="absolute border-none origin-top-left"
              style={{
                /* 1. We keep the internal resolution high for quality */
                width: "1000px",
                height: "1414px",
                /* 2. We use 'inset-0' logic or manual calculation to ensure it covers */
                /* Note: Adjust scale(0.25) or similar based on your 'h-64' height */
                transform: "scale(0.225)",
                pointerEvents: "none",
              }}
            />
            {/* Overlay to prevent iframe interaction */}
            <div className="absolute inset-0 z-10" />
          </div>
        ) : (
          <img
            src={preview}
            alt={title}
            /* object-cover ensures it fills the entire box without gaps */
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x424/f1f5f9/64748b?text=No+Preview";
            }}
          />
        )}

        {/* Subtle gradient overlay to make the "Edit" state feel more professional */}
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
          className="ml-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
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
