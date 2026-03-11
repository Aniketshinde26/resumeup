import React from "react";
import { Download } from "lucide-react";

interface BuilderHeaderProps {
  productName: string; // "Cover" or "Resume"
  productSuffix?: string; // "Up"
  accentColor: string; // "text-indigo-600" or "text-green-600"
  buttonColor: string; // "bg-indigo-600" or "bg-green-600"
  docTitle: string;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
  onDownload: () => void;
}

export default function BuilderHeader({
  productName,
  productSuffix = "Up",
  accentColor,
  buttonColor,
  docTitle,
  isSaving,
  isDirty,
  onSave,
  onDownload,
}: BuilderHeaderProps) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-300 px-8 flex items-center justify-between sticky top-0 z-30 no-print transition-all">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0 tracking-tight">
          <span className="text-slate-900 font-bold text-xl">{productName}</span>
          <span className={`${accentColor} font-bold text-xl`}>{productSuffix}</span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <h1 className="font-medium text-slate-600">{docTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onDownload}
          className={`${buttonColor} text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm flex items-center gap-2`}
        >
          <Download size={18} />
          Download PDF
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full shadow-sm">
          <div
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              isSaving ? "bg-blue-500 animate-pulse" : isDirty ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          <span className="text-[10px] font-bold uppercase text-slate-500">
            {isSaving ? "Saving..." : isDirty ? "Changes Unsaved" : "Saved"}
          </span>
        </div>
      </div>
    </header>
  );
}