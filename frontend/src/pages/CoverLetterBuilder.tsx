import { 
  Building2, 
  AlignLeft, 
  User, 
  Camera, 
  Trash2, 
  Download, 
  Calendar 
} from "lucide-react";
import { useCoverLetterBuilder } from "../hooks/useCoverLetterBuilder";
import { COVER_LETTER_TEMPLATES_MAP } from "../types/templateindex"; 
import "../print.css";

export default function CoverLetterBuilder() {
  const {
    coverLetter,
    loading,
    saving,
    updateData,
    handleSave,
    updatePersonal,
    isDirty,
    tempImage,
    setTempImage,
  } = useCoverLetterBuilder();

  if (loading) return <div className="p-10 text-center">Loading Cover Letter...</div>;
  if (!coverLetter) return null;

  const SelectedTemplate = COVER_LETTER_TEMPLATES_MAP[coverLetter.TemplateId || "professional"];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      {/* TOOLBAR */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-300 px-8 flex items-center justify-between sticky top-0 z-30 no-print transition-all">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0 tracking-tight">
            <span className="text-slate-900 font-bold text-xl">Cover</span>
            <span className="text-indigo-600 font-bold text-xl">Up</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="font-medium text-slate-600">{coverLetter.Title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const template = document.getElementById("cover-letter-template");
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
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <title>Cover Letter</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                      @page {
                        size: A4 portrait;
                        margin: 0;
                      }
                      * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                      }
                      body {
                        width: 210mm;
                        margin: 0;
                        padding: 0;
                      }
                      #cover-letter-template {
                        width: 210mm;
                        min-height: 297mm;
                      }
                    </style>
                  </head>
                  <body>
                    ${template.outerHTML}
                    <script>
                      window.onload = () => {
                        setTimeout(() => {
                          window.focus();
                          window.print();
                        }, 500);
                      };
                    </script>
                  </body>
                </html>
              `);

              iframeDoc.close();

              setTimeout(() => {
                if (document.body.contains(iframe)) {
                  document.body.removeChild(iframe);
                }
              }, 3000);
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} />
            Download PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full shadow-sm">
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                saving
                  ? "bg-blue-500 animate-pulse"
                  : isDirty
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
            <span className="text-[10px] font-bold uppercase text-slate-500">
              {saving ? "Saving..." : isDirty ? "Changes Unsaved" : "Saved"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDE: INPUT FORMS */}
        <section className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 space-y-10 custom-scrollbar no-print">
          
          {/* 1. SENDER INFO (Personal) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-slate-800 font-bold flex items-center gap-2">
                <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                  <User size={18} />
                </div>
                Your Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Photo Section */}
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <label className="relative cursor-pointer group shrink-0">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setTempImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-inner border-2 border-white flex items-center justify-center group-hover:border-indigo-400 transition-all">
                    {tempImage ? (
                      <img src={tempImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <div className="text-slate-400 group-hover:text-indigo-500 flex flex-col items-center">
                        <Camera size={24} strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                      <span className="text-white text-[10px] font-bold">CHANGE</span>
                    </div>
                  </div>
                </label>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700">Profile Picture</h4>
                      <p className="text-[11px] text-slate-500">Matches your resume styling.</p>
                    </div>
                    {tempImage && (
                      <button
                        onClick={() => setTempImage(null)}
                        className="flex items-center gap-1 text-red-500 text-[11px] font-bold hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={coverLetter.Data.personal?.fullName || ""}
                    onChange={(e) => updatePersonal("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={coverLetter.Data.personal?.jobTitle || ""}
                    onChange={(e) => updatePersonal("jobTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={coverLetter.Data.personal?.email || ""}
                    onChange={(e) => updatePersonal("email", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Phone</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={coverLetter.Data.personal?.phone || ""}
                    onChange={(e) => updatePersonal("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={coverLetter.Data.personal?.location || ""}
                    onChange={(e) => updatePersonal("location", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. RECIPIENT INFO */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-slate-800 font-bold flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Building2 size={18} />
                </div>
                Recipient Details
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  value={coverLetter.Data.recipient?.company || ""}
                  onChange={(e) => updateData({ recipient: { ...coverLetter.Data.recipient, company: e.target.value } })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Hiring Manager (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  value={coverLetter.Data.recipient?.hiringManager || ""}
                  onChange={(e) => updateData({ recipient: { ...coverLetter.Data.recipient, hiringManager: e.target.value } })}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Company Address (Optional)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none h-20"
                  placeholder="123 Tech Lane..."
                  value={coverLetter.Data.recipient?.address || ""}
                  onChange={(e) => updateData({ recipient: { ...coverLetter.Data.recipient, address: e.target.value } })}
                />
              </div>
            </div>
          </div>

          {/* 3. LETTER CONTENT */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-slate-800 font-bold flex items-center gap-2">
                <div className="p-1.5 bg-violet-100 text-violet-600 rounded-lg">
                  <AlignLeft size={18} />
                </div>
                Letter Content
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="e.g. October 24, 2024"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm"
                      value={coverLetter.Data.letter?.date || ""}
                      onChange={(e) => updateData({ letter: { ...coverLetter.Data.letter, date: e.target.value } })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Subject Line (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Application for Frontend Role"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm"
                    value={coverLetter.Data.letter?.subject || ""}
                    onChange={(e) => updateData({ letter: { ...coverLetter.Data.letter, subject: e.target.value } })}
                  />
                </div>
              </div>

              <div className="space-y-1.5 mt-4">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Salutation</label>
                <input
                  type="text"
                  placeholder="e.g. Dear Hiring Manager,"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
                  value={coverLetter.Data.letter?.salutation || ""}
                  onChange={(e) => updateData({ letter: { ...coverLetter.Data.letter, salutation: e.target.value } })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
                  <span>Body Paragraphs</span>
                  <span className="text-slate-400 normal-case font-normal text-[10px]">Separate paragraphs with a blank line (Enter twice)</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all min-h-[300px] resize-y leading-relaxed"
                  placeholder="I am writing to express my interest in..."
                  value={(coverLetter.Data.letter?.bodyParagraphs || []).join("\n\n")}
                  onChange={(e) => {
                    const paragraphs = e.target.value.split("\n\n");
                    updateData({ letter: { ...coverLetter.Data.letter, bodyParagraphs: paragraphs } });
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Sign-off / Closing</label>
                <input
                  type="text"
                  placeholder="e.g. Sincerely,"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
                  value={coverLetter.Data.letter?.closing || ""}
                  onChange={(e) => updateData({ letter: { ...coverLetter.Data.letter, closing: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-slate-300/60 to-transparent" />

        {/* RIGHT SIDE: PREVIEW */}
        <section className="w-1/2 bg-slate-300 overflow-y-auto custom-scrollbar h-full">
          <div className="flex justify-center items-start min-h-full w-full py-12 bg-slate-300">
            <div
              id="cover-letter-preview"
              className="bg-white shadow-2xl rounded-[24px] overflow-hidden ring-1 ring-black/10 shrink-0"
              style={{
                width: "210mm",
                height: "297mm",
                minWidth: "210mm",
                minHeight: "297mm",
                margin: "0 auto",
              }}
            >
              {SelectedTemplate ? (
                <SelectedTemplate
                  data={{
                    ...coverLetter.Data,
                    personal: {
                      ...coverLetter.Data.personal,
                      image: tempImage,
                    },
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Template Not Found
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .input-style {
          @apply border border-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}