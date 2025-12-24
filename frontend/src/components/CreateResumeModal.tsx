import { useState } from "react";

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  isLoading: boolean;
}

export default function CreateResumeModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}: CreateResumeModalProps) {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-text-main">Create New Resume</h2>
        <p className="text-text-muted mt-1 mb-6">
          Give your resume a name to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              Resume Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Full Stack Developer - Google"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition"
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-brand-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-hover transition disabled:opacity-50 shadow-md"
            >
              {isLoading ? "Creating..." : "Start Building"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
