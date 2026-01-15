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
      className="bg-card-bg border border-border-subtle rounded-xl p-11 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
    >
      {/* SHOWCASE CONTAINER */}
      <div className="bg-slate-800 rounded-lg h-52 mb-4 border border-slate-200 overflow-hidden relative shadow-sm group-hover:shadow-inner transition-all flex justify-center items-center">
        {showContent && resumeData?.id ? (
          <div className="relative h-full aspect-[1/1.414] pointer-events-none select-none overflow-hidden bg-white shadow-sm">
            <iframe
              src={`/resume/preview/${resumeData.id}`}
              title={title}
              className="absolute border-none origin-top-left"
              style={{
                width: "800px",
                height: "1132px",
                /* MATH: h-52 is 208px. 
                   To fit a 1132px iframe into 208px: 208 / 1132 = 0.1837
                */
                transform: "scale(0.1837)",
                pointerEvents: "none",
              }}
            />
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

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
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

// interface ResumeCardProps {
//   title: string;
//   updatedAt: string;
//   resumeData?: any;
//   showContent?: boolean; // Use this to toggle between Template and User Resume
//   preview?: string;
//   onClick?: () => void;
//   onDelete?: () => void;
// }

// export default function ResumeCard({
//   title,
//   updatedAt,
//   resumeData,
//   preview,
//   showContent = false,
//   onClick,
//   onDelete,
// }: ResumeCardProps) {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-card-bg border border-border-subtle rounded-xl p-4 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group relative"
//     >
//       {/* SHOWCASE CONTAINER */}
//       <div className="bg-white rounded-lg h-52 mb-4 border border-slate-200 overflow-hidden relative shadow-sm group-hover:shadow-inner transition-all">
//         {/* LOGIC: If showContent is true and we have an ID, show the real resume iframe */}
//         {showContent && resumeData?.id ? (
//           <div className="w-full h-full bg-white select-none pointer-events-none relative">
//             <iframe
//               src={`/resume/preview/${resumeData.id}`}
//               title={title}
//               className="absolute border-none origin-top-left"
//               style={{
//                 width: "800px", // Standard resume width
//                 height: "1132px", // Standard A4 height
//                 transform: "scale(0.245)", // Shrinks the 800px width to fit your ~200px card
//                 pointerEvents: "none",
//               }}
//             />
//             {/* Overlay to ensure the iframe doesn't intercept clicks */}
//             <div className="absolute inset-0 z-10" />
//           </div>
//         ) : (
//           /* FALLBACK: Show the static template image (for "Start New" section) */
//           <img
//             src={preview}
//             alt={title}
//             className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//             onError={(e) => {
//               e.currentTarget.src =
//                 "https://via.placeholder.com/300x424/f1f5f9/64748b?text=No+Preview";
//             }}
//           />
//         )}

//         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
//       </div>

//       {/* INFO FOOTER */}
//       <div className="flex justify-between items-start">
//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-text-main truncate group-hover:text-brand-primary transition-colors">
//             {title || "Untitled Resume"}
//           </h3>
//           <p className="text-xs text-text-muted mt-1">
//             Edited {new Date(updatedAt).toLocaleDateString()}
//           </p>
//         </div>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete?.();
//           }}
//           className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }
