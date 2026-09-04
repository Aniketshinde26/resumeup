import { useEffect, useRef, useState } from "react";
import type { ExtendedDocumentCardProps } from "../types/layoutprops";
import {
  TEMPLATES,
  createEmptyResumeData,
  type ResumeData,
  type CoverLetterData,
  COVER_LETTER_TEMPLATES_MAP,
} from "../types/templateindex";

export default function DocumentCard({
  title,
  updatedAt,
  type,
  preview,
  showContent = false,
  templateId,
  data,
  onClick,
  onDelete,
}: ExtendedDocumentCardProps) {
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

  let parsedData: unknown = data;
  if (typeof parsedData === "string") {
    try {
      parsedData = JSON.parse(parsedData);
    } catch {
      parsedData = null;
    }
  }

  const isResume = type === "resume";

  const ResumeTemplate =
    isResume && templateId ? TEMPLATES[templateId] : null;

  const CoverLetterTemplate =
    !isResume && templateId
      ? (COVER_LETTER_TEMPLATES_MAP as Record<string, React.ComponentType<{ data: CoverLetterData }>>)[templateId]
      : null;

  const hasTemplate = Boolean(ResumeTemplate || CoverLetterTemplate);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-md cursor-pointer group relative flex flex-col h-full"
    >
      <div
        ref={containerRef}
        className="bg-slate-50 rounded-lg aspect-[1/1.41] mb-5 border border-slate-200 overflow-hidden relative shadow-sm flex items-center justify-center pointer-events-none"
      >
        {showContent && hasTemplate ? (
          <div className="relative w-full h-full bg-white flex items-start justify-center overflow-hidden">
            <div
              style={{
                width: "790px",
                height: "1118px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                position: "absolute",
                top: 0,
                left: "50%",
                marginLeft: "-395px",
              }}
            >
              {isResume && ResumeTemplate ? (
                <ResumeTemplate
                  data={(parsedData as ResumeData) || createEmptyResumeData()}
                />
              ) : CoverLetterTemplate ? (
                <CoverLetterTemplate
                  data={
                    (parsedData as CoverLetterData) || {
                      personal: { name: "", email: "", phone: "", address: "" },
                      recipient: { name: "", company: "", address: "" },
                      letter: { text: "" },
                    }
                  }
                />
              ) : null}
            </div>
          </div>
        ) : (
          <img
            src={
              preview ||
              "https://via.placeholder.com/300x424/f1f5f9/64748b?text=No+Preview"
            }
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex justify-between items-end mt-auto">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 truncate group-hover:text-green-500 transition-colors text-sm">
            {title || `Untitled ${isResume ? "Resume" : "Cover Letter"}`}
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">
            Edited{" "}
            {updatedAt ? new Date(updatedAt).toLocaleDateString() : "Recently"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
        >
          <svg
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