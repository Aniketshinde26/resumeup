// interface ResumeCardProps {
//   title: string;
//   updatedAt: string;
//   onClick?: () => void;
// }

// export default function ResumeCard({ title, updatedAt }: ResumeCardProps) {
//   return (
//     <div className="bg-card-bg border border-border-subtle rounded-xl p-4 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group">
//       {/* Decorative Resume Preview Placeholder */}
//       <div className="bg-slate-50 rounded-lg h-40 mb-4 border border-slate-100 overflow-hidden relative">
//         <div className="absolute top-4 left-4 right-4 h-2 bg-slate-200 rounded" />
//         <div className="absolute top-8 left-4 w-1/2 h-2 bg-slate-200 rounded" />
//         <div className="absolute top-16 left-4 right-4 h-20 bg-slate-100 rounded border border-slate-200/50" />
//       </div>

//       <h3 className="font-semibold text-text-main truncate group-hover:text-brand-primary transition-colors">
//         {title || "Untitled Resume"}
//       </h3>
//       <p className="text-xs text-text-muted mt-1">
//         Edited {new Date(updatedAt).toLocaleDateString()}
//       </p>
//     </div>
//   );
// }

// 1. The interface must be defined here
interface ResumeCardProps {
  title: string;
  updatedAt: string;
  onClick?: () => void;
}

// 2. Then you use it in the function arguments
export default function ResumeCard({
  title,
  updatedAt,
  onClick,
}: ResumeCardProps) {
  return (
    <div
      onClick={onClick} // Make sure this is added!
      className="bg-card-bg border border-border-subtle rounded-xl p-4 hover:border-brand-primary/50 transition-all hover:shadow-md cursor-pointer group"
    >
      <div className="bg-slate-50 rounded-lg h-40 mb-4 border border-slate-100 overflow-hidden relative">
        <div className="absolute top-4 left-4 right-4 h-2 bg-slate-200 rounded" />
        <div className="absolute top-8 left-4 w-1/2 h-2 bg-slate-200 rounded" />
        <div className="absolute top-16 left-4 right-4 h-20 bg-slate-100 rounded border border-slate-200/50" />
      </div>

      <h3 className="font-semibold text-text-main truncate group-hover:text-brand-primary transition-colors">
        {title || "Untitled Resume"}
      </h3>
      <p className="text-xs text-text-muted mt-1">
        Edited {new Date(updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
