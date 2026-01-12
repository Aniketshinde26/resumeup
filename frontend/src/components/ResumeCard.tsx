//

interface ResumeCardProps {
  title: string;
  updatedAt: string;
  preview?: string; // New: added to pass the screenshot path
  onClick?: () => void;
  onDelete?: () => void;
}

export default function ResumeCard({
  title,
  updatedAt,
  preview, // Destructure the new prop
  onClick,
  onDelete,
}: ResumeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card-bg border border-border-subtle rounded-xl p-4 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
    >
      {/* SHOWCASE CONTAINER */}
      <div className="bg-white rounded-lg h-52 mb-4 border border-slate-200 overflow-hidden relative shadow-sm group-hover:shadow-inner transition-all">
        {preview ? (
          <img
            src={preview}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Keep your old bars as a fallback if no image is provided */
          <div className="p-4 opacity-40">
            <div className="w-1/2 h-2 bg-slate-200 rounded mb-2" />
            <div className="w-full h-1 bg-slate-100 rounded mb-1" />
            <div className="w-full h-1 bg-slate-100 rounded mb-1" />
          </div>
        )}

        {/* Subtle overlay for better feel on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-main truncate group-hover:text-brand-primary transition-colors">
            {title || "Untitled Resume"}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Edited {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          title="Delete Resume"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
