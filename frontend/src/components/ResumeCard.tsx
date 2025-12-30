interface ResumeCardProps {
  title: string;
  updatedAt: string;
  onClick?: () => void;
  onDelete?: () => void; // Add this prop to the interface
}

export default function ResumeCard({
  title,
  updatedAt,
  onClick,
  onDelete, // Destructure it here
}: ResumeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card-bg border border-border-subtle rounded-xl p-4 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
    >
      {/* Decorative Resume Preview Placeholder */}
      <div className="bg-slate-50 rounded-lg h-40 mb-4 border border-slate-100 overflow-hidden relative">
        <div className="absolute top-4 left-4 right-4 h-2 bg-slate-200 rounded" />
        <div className="absolute top-8 left-4 w-1/2 h-2 bg-slate-200 rounded" />
        <div className="absolute top-16 left-4 right-4 h-20 bg-slate-100 rounded border border-slate-200/50" />
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

        {/* --- DELETE BUTTON --- */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card's onClick from firing
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
