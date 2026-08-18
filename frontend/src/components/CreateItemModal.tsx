
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CreateItemModalProps } from "../types/layoutprops";


export default function CreateItemModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
  type,
}: CreateItemModalProps) {
  const [title, setTitle] = useState("");
  const { t } = useTranslation('translation', { keyPrefix: 'createmodal' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-brand-card)] rounded-2xl w-full max-w-md p-8 shadow-2xl zoom-in duration-200">
        
        <h2 className="text-2xl font-bold text-[var(--color-text-main)]">
          {t('create_new')} {type === "Resume" ? t('resume', 'Resume') : t('cover_letter', 'Cover Letter')}
        </h2>
        <p className="text-slate-600 mt-1 mb-6">
          {t('give_your')} {(type === "Resume" ? t('resume', 'Resume') : t('cover_letter', 'Cover Letter')).toLowerCase()} {t('a_name_to_get_started')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
              {type === "Resume" ? t('resume', 'Resume') : t('cover_letter', 'Cover Letter')} {t('title')}
            </label>
            
            <input
              autoFocus
              type="text"
              placeholder={
                type === "Resume" 
                  ? t('full_stack_developer_google') 
                  : t('application_letter_microsoft')
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-900 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition"
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? t('creating') : t('start_building')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}