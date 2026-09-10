import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { BuilderHeaderProps } from "../types/layoutprops";

export default function BuilderHeader({
  productName,
  productSuffix = "Pro",
  accentColor,
  buttonColor,
  docTitle,
  isSaving,
  isDirty,
  onSave,
  onDownload,
}: BuilderHeaderProps) {
    const {t} = useTranslation('translation',{keyPrefix:'header'});

  return (
    <header className="h-auto md:h-20 bg-(--color-header-bg) backdrop-blur-md border-b border-slate-300 px-4 md:px-8 py-3 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 z-30 no-print transition-all gap-2 md:gap-0">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-0 tracking-tight">
          <span
          style={{ color: 'var(--color-text-main)' }} className="font-bold text-lg md:text-xl">{productName}</span>
          <span className={`${accentColor} font-bold text-lg md:text-xl`}>{productSuffix}</span>
        </div>
        <div className="hidden sm:block h-6 w-px bg-slate-200" />
        <h1 className="hidden sm:block font-medium text-slate-600 text-sm md:text-base" style={{ color: 'var(--color-text-main)' }}>
          {docTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onDownload}
          className={`${buttonColor} text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5 md:gap-2 text-xs md:text-base`}
        >
          <Download size={16} />
          <span className="hidden sm:inline">{t('download_pdf')}</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm text-xs md:text-base"
        >
          {isSaving ? t("saving") : t("save")}
        </button>

        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 bg-white border rounded-full shadow-sm">
          <div
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              isSaving ? "bg-blue-500 animate-pulse" : isDirty ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          <span className="text-[9px] md:text-[10px] font-bold uppercase text-slate-500">
            {isSaving ? t("saving") : isDirty ? t("changes_unsaved") : t("saved")}
          </span>
        </div>
      </div>
    </header>
  );
}