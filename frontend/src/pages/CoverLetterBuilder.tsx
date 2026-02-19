import useCoverLetterBuilder from "../hooks/useCoverLetterBuilder";
import { User, Mail, MapPin, Phone, Type, Send, PenTool, Download, Trash2, Camera } from "lucide-react";
import { COVER_LETTER_TEMPLATES } from "../types/coverLetterTemplates";
import "../print.css";
import { TEMPLATES } from "../types/templateindex";

export default function CoverLetterBuilder() {
  const {
    coverLetter,
    loading,
    saving,
    update,
    handleSave,
    updatePersonalInfo,
  } = useCoverLetterBuilder();

  if (loading) return <div className="p-10 text-center">Loading Cover Letter...</div>;
  if (!coverLetter) return null;

  // Fallback to a default template if templateId is missing
// In Builder.tsx or CoverLetterBuilder.tsx
const SelectedTemplate = TEMPLATES[coverLetter.TemplateId || "minimal"] as React.ComponentType<any>;
  const printLetter = () => {
    const template = document.getElementById("cover-letter-preview");
    if (!template) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "100vw";
    iframe.style.bottom = "100vh";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.write(`
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4 portrait; margin: 0; }
            body { width: 210mm; margin: 0; padding: 0; }
            #cover-letter-preview { width: 210mm; min-height: 297mm; }
          </style>
        </head>
        <body>
          ${template.outerHTML}
          <script>
            window.onload = () => {
              setTimeout(() => { window.focus(); window.print(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
    setTimeout(() => document.body.removeChild(iframe), 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      {/* TOOLBAR */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-300 px-8 flex items-center justify-between sticky top-0 z-30 no-print">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0 tracking-tight">
            <span className="text-slate-900 font-bold text-xl">Cover</span>
            <span className="text-green-600 font-bold text-xl">Up</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="font-medium text-slate-600">{coverLetter.Title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={printLetter}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Download PDF
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full shadow-sm">
            <div className={`h-2 w-2 rounded-full ${saving ? "bg-blue-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="text-[10px] font-bold uppercase text-slate-500">
              {saving ? "Saving..." : "Synced"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDE: EDITOR */}
        <section className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 space-y-8 custom-scrollbar no-print">
          
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-slate-800 font-bold flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><User size={18} /></div>
              Sender Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Your Full Name" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={coverLetter.data.personal?.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
              />
              <input 
                placeholder="Job Title" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={coverLetter.data.personal?.title || ""}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
              />
            </div>
          </div>

          {/* COVER LETTER CONTENT */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h2 className="text-slate-800 font-bold flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg"><PenTool size={18} /></div>
              Letter Content
            </h2>

            {/* Salutation */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Salutation</label>
              <input
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Dear Hiring Manager,"
                value={coverLetter.data.salutation || ""}
                onChange={(e) => update({ salutation: e.target.value })}
              />
            </div>

            {/* Introduction */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Introduction (The Hook)</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[80px] outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Why are you applying?"
                value={coverLetter.data.introduction || ""}
                onChange={(e) => update({ introduction: e.target.value })}
              />
            </div>

            {/* Main Body */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Body Paragraphs</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[200px] outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Detail your experience and skills..."
                value={coverLetter.data.body || ""}
                onChange={(e) => update({ body: e.target.value })}
              />
            </div>

            {/* Closing */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Closing Statement</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[80px] outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Next steps and call to action..."
                value={coverLetter.data.closing || ""}
                onChange={(e) => update({ closing: e.target.value })}
              />
            </div>

            {/* Signature */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Signature</label>
              <input
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Sincerely, [Your Name]"
                value={coverLetter.data.signature || ""}
                onChange={(e) => update({ signature: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: PREVIEW */}
        <section className="w-1/2 bg-slate-300 overflow-y-auto custom-scrollbar p-12">
          <div 
            id="cover-letter-preview"
            className="bg-white shadow-2xl rounded-sm mx-auto overflow-hidden"
            style={{ width: "210mm", minHeight: "297mm" }}
          >
            {SelectedTemplate ? (
              <SelectedTemplate data={coverLetter.data} />
            ) : (
              <div className="p-20 text-center text-slate-400">Template Loading...</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}