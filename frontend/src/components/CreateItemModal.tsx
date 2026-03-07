import { useState } from "react";

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  isLoading: boolean;
  // New prop to differentiate between types
  type: "Resume" | "Cover Letter"; 
}

export default function 
CreateItemModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
  type,
}: CreateItemModalProps) {
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
        {/* Dynamic Heading */}
        <h2 className="text-2xl font-bold text-slate-900">Create New {type}</h2>
        <p className="text-slate-600 mt-1 mb-6">
          Give your {type.toLowerCase()} a name to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {/* Dynamic Label */}
            <label className="block text-sm font-medium text-slate-900 mb-2">
              {type} Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder={
                type === "Resume" 
                  ? "e.g. Full Stack Developer - Google" 
                  : "e.g. Application Letter - Microsoft"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition"
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? "Creating..." : "Start Building"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}