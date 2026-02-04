import { useBuilder } from "../hooks/useBuilder";
import {Award,LanguagesIcon, Rocket, LinkIcon,Wrench , X, User,Briefcase,GraduationCap, Calendar, Camera,Plus, Trash2, Download } from "lucide-react";
import { TEMPLATES } from "../templates/templateindex";
import "../print.css";
export default function Builder() {
  const {
    resume,
    loading,
    saving,
    updateData,
    handleSave,
    updatePersonal,
    isDirty,
    tempImage,
    setTempImage,
  } = useBuilder();

  if (loading) return <div className="p-10 text-center">Loading Resume...</div>;
  if (!resume) return null;

  const SelectedTemplate = TEMPLATES[resume.templateId || "minimal"];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      {/* TOOLBAR */}
<header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-300 px-8 flex items-center justify-between sticky top-0 z-30 no-print transition-all">        <div className="flex items-center gap-4">
<div className="flex items-center gap-0 tracking-tight">
  <span className="text-slate-900 font-bold text-xl">Resume</span>
  <span className="text-green-600 font-bold text-xl">Up</span>
</div>          <div className="h-6 w-px bg-slate-200" />
          <h1 className="font-medium text-slate-600">{resume.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const template = document.getElementById("resume-template");
              if (!template) return;

              // 1. Create a hidden iframe instead of window.open
              const iframe = document.createElement("iframe");
              iframe.style.position = "fixed";
              iframe.style.right = "100vw"; // Keep it off-screen
              iframe.style.bottom = "100vh";
              iframe.style.width = "0";
              iframe.style.height = "0";
              iframe.style.border = "0";
              document.body.appendChild(iframe);

              const iframeDoc = iframe.contentWindow?.document;
              if (!iframeDoc) return;

              // 2. Write your content just like you did before
              iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Resume</title>
          
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
            #resume-template {
              width: 210mm;
              min-height: 297mm;
            }
          </style>
        </head>
        <body>
          ${template.outerHTML}
          <script>
            // This waits for the Tailwind CDN and images to load inside the iframe
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

              // 3. Cleanup: Remove the invisible iframe after the print dialog closes
              // We use a longer timeout to give the browser time to finish the print handoff
              setTimeout(() => {
                if (document.body.contains(iframe)) {
                  document.body.removeChild(iframe);
                }
              }, 3000);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all shadow-sm flex items-center gap-2"
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
            {/* The Status Dot */}
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                saving
                  ? "bg-blue-500 animate-pulse"
                  : isDirty
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />

            {/* The Status Text */}
            <span className="text-[10px] font-bold uppercase text-slate-500">
              {saving ? "Saving..." : isDirty ? "Changes Unsaved" : "Saved"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDE: INPUT FORMS */}
        <section className="w-1/2 overflow-y-auto p-8 border-r space-y-10 custom-scrollbar no-print">
          {/* 1. PERSONAL INFO */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
        <User size={18} />
      </div>
      Personal Information
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
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
            <span className="text-white text-[10px] font-bold">CHANGE</span>
          </div>
        </div>
      </label>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Profile Picture</h4>
            <p className="text-[11px] text-slate-500">JPG, PNG or SVG. Max 1MB.</p>
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
        <input
          type="text"
          placeholder="Or paste an image URL..."
          className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
          value={resume.data.personal?.image?.startsWith("data:") ? "Local Image Uploaded" : resume.data.personal?.image || ""}
          onChange={(e) => updatePersonal("image", e.target.value)}
        />
      </div>
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="e.g. John Doe"
          value={resume.data.personal?.fullName || ""}
          onChange={(e) => updatePersonal("fullName", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Job Title</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="e.g. Software Engineer"
          value={resume.data.personal?.jobTitle || ""}
          onChange={(e) => updatePersonal("jobTitle", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="name@example.com"
          value={resume.data.personal?.email || ""}
          onChange={(e) => updatePersonal("email", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="+1 (555) 000-0000"
          value={resume.data.personal?.phone || ""}
          onChange={(e) => updatePersonal("phone", e.target.value)}
        />
      </div>

      <div className="space-y-1.5 md:col-span-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Location</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="City, Country"
          value={resume.data.personal?.location || ""}
          onChange={(e) => updatePersonal("location", e.target.value)}
        />
      </div>

      <div className="space-y-1.5 md:col-span-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Professional Summary</label>
        <textarea
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 min-h-[120px] resize-none"
          placeholder="Briefly describe your career background and key achievements..."
          value={resume.data.personal?.summary || ""}
          onChange={(e) => updatePersonal("summary", e.target.value)}
        />
      </div>
    </div>
  </div>
</div>
          {/* 2. EXPERIENCE */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
        <Briefcase size={18} />
      </div>
      Work Experience
    </h2>
    <button
      onClick={() =>
        updateData({
          experience: [
            ...(resume.data.experience || []),
            { company: "", position: "", startDate: "", endDate: "", description: "" },
          ],
        })
      }
      className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all border border-emerald-100"
    >
      <Plus size={14} strokeWidth={3} />
      ADD EXPERIENCE
    </button>
  </div>

  <div className="p-6 space-y-8">
    {resume.data.experience?.map((exp: any, idx: number) => (
      <div
        key={idx}
        className="relative pl-6 border-l-2 border-slate-100 hover:border-emerald-400 transition-colors group"
      >
        {/* The Timeline Dot */}
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-emerald-400 transition-colors" />

        {/* Delete Button */}
        <button
          onClick={() => {
            const newList = [...resume.data.experience];
            newList.splice(idx, 1);
            updateData({ experience: newList });
          }}
          className="absolute top-0 right-0 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Remove entry"
        >
          <Trash2 size={16} />
        </button>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Company</label>
              <input
                type="text"
                placeholder="e.g. Google"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-semibold text-slate-700"
                value={exp.company}
                onChange={(e) => {
                  const newList = [...resume.data.experience];
                  newList[idx].company = e.target.value;
                  updateData({ experience: newList });
                }}
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Developer"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-600"
                value={exp.position}
                onChange={(e) => {
                  const newList = [...resume.data.experience];
                  newList[idx].position = e.target.value;
                  updateData({ experience: newList });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Range */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Duration</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Jan 2022 - Present"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-600"
                  value={`${exp.startDate}${exp.endDate ? " - " + exp.endDate : ""}`}
                  onChange={(e) => {
                    const newList = [...resume.data.experience];
                    const parts = e.target.value.split("-");
                    newList[idx].startDate = parts[0]?.trim() || "";
                    newList[idx].endDate = parts[1]?.trim() || "";
                    updateData({ experience: newList });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Responsibilities</label>
            <textarea
              placeholder="Describe your achievements..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-600 min-h-[100px] resize-none"
              value={exp.description}
              onChange={(e) => {
                const newList = [...resume.data.experience];
                newList[idx].description = e.target.value;
                updateData({ experience: newList });
              }}
            />
          </div>
        </div>
      </div>
    ))}

    {(!resume.data.experience || resume.data.experience.length === 0) && (
      <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
        <p className="text-slate-400 text-sm">No experience added yet. Click the button above to start.</p>
      </div>
    )}
  </div>
</div>

          {/* 3. EDUCATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-violet-100 text-violet-600 rounded-lg">
        <GraduationCap size={18} />
      </div>
      Education
    </h2>
    <button
      onClick={() =>
        updateData({
          education: [
            ...(resume.data.education || []),
            { school: "", degree: "", year: "" },
          ],
        })
      }
      className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-all border border-violet-100"
    >
      <Plus size={14} strokeWidth={3} />
      ADD EDUCATION
    </button>
  </div>

  <div className="p-6 space-y-6">
    {resume.data.education?.map((edu: any, idx: number) => (
      <div
        key={idx}
        className="relative p-5 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:border-violet-200 hover:bg-white transition-all"
      >
        {/* Delete Button */}
        <button
          onClick={() => {
            const newList = [...resume.data.education];
            newList.splice(idx, 1);
            updateData({ education: newList });
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={16} />
        </button>

        <div className="grid grid-cols-1 gap-4">
          {/* School Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              School or University
            </label>
            <input
              type="text"
              placeholder="e.g. Stanford University"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all font-semibold text-slate-700"
              value={edu.school}
              onChange={(e) => {
                const newList = [...resume.data.education];
                newList[idx].school = e.target.value;
                updateData({ education: newList });
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Degree */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Degree / Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Bachelor of Science in CS"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-600"
                value={edu.degree}
                onChange={(e) => {
                  const newList = [...resume.data.education];
                  newList[idx].degree = e.target.value;
                  updateData({ education: newList });
                }}
              />
            </div>

            {/* Year */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Graduation Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="e.g. 2024"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm text-slate-600"
                  value={edu.year}
                  onChange={(e) => {
                    const newList = [...resume.data.education];
                    newList[idx].year = e.target.value;
                    updateData({ education: newList });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}

    {(!resume.data.education || resume.data.education.length === 0) && (
      <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
        <GraduationCap size={32} className="mx-auto text-slate-200 mb-2" />
        <p className="text-slate-400 text-sm">Add your academic background to complete your profile.</p>
      </div>
    )}
  </div>
</div>

          {/* 4. SKILLS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
        <Wrench size={18} />
      </div>
      Technical Skills
    </h2>
    <span className="text-[10px] font-medium text-slate-400">Press Enter to add</span>
  </div>

  <div className="p-6 space-y-5">
    {/* Input Area */}
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors">
        <Plus size={16} strokeWidth={3} />
      </div>
      <input
        type="text"
        placeholder="e.g. React, TypeScript, Figma..."
        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = e.currentTarget.value.trim();
            if (val) {
              updateData({
                skills: [...(resume.data.skills || []), val],
              });
              e.currentTarget.value = "";
            }
          }
        }}
      />
    </div>

    {/* Tag Cloud */}
    <div className="flex flex-wrap gap-2">
      {resume.data.skills?.map((skill: string, idx: number) => (
        <div
          key={idx}
          className="group flex items-center gap-1.5 bg-white border border-slate-200 hover:border-amber-300 hover:shadow-sm px-3 py-1.5 rounded-lg transition-all"
        >
          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
            {skill}
          </span>
          <button
            onClick={() => {
              const newList = resume.data.skills.filter(
                (_: string, i: number) => i !== idx
              );
              updateData({ skills: newList });
            }}
            className="text-slate-300 hover:text-red-500 transition-colors ml-1"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>
      ))}

      {(!resume.data.skills || resume.data.skills.length === 0) && (
        <div className="w-full py-4 text-center">
          <p className="text-xs text-slate-400 italic">No skills added. Type a skill above and hit Enter.</p>
        </div>
      )}
    </div>
  </div>
</div>

          {/* 5. PROJECTS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-cyan-100 text-cyan-600 rounded-lg">
        <Rocket size={18} />
      </div>
      Personal Projects
    </h2>
    <button
      onClick={() =>
        updateData({
          projects: [
            ...(resume.data.projects || []),
            { name: "", link: "", description: "" },
          ],
        })
      }
      className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:bg-cyan-50 px-3 py-1.5 rounded-lg transition-all border border-cyan-100"
    >
      <Plus size={14} strokeWidth={3} />
      ADD PROJECT
    </button>
  </div>

  <div className="p-6 space-y-6">
    {resume.data.projects?.map((proj: any, idx: number) => (
      <div
        key={idx}
        className="relative p-5 bg-white border border-slate-200 rounded-2xl group hover:shadow-md hover:border-cyan-200 transition-all"
      >
        {/* Delete Button */}
        <button
          onClick={() => {
            const newList = [...resume.data.projects];
            newList.splice(idx, 1);
            updateData({ projects: newList });
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={16} />
        </button>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Project Name
              </label>
              <input
                type="text"
                placeholder="e.g. E-commerce Dashboard"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all font-semibold text-slate-700 placeholder:font-normal"
                value={proj.name}
                onChange={(e) => {
                  const newList = [...resume.data.projects];
                  newList[idx].name = e.target.value;
                  updateData({ projects: newList });
                }}
              />
            </div>

            {/* Project Link */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Project Link (URL)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-sm text-slate-500 italic"
                  value={proj.link}
                  onChange={(e) => {
                    const newList = [...resume.data.projects];
                    newList[idx].link = e.target.value;
                    updateData({ projects: newList });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Description & Tech Stack
            </label>
            <textarea
              placeholder="What did you build and what tools did you use?"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-sm text-slate-600 min-h-[80px] resize-none"
              value={proj.description}
              onChange={(e) => {
                const newList = [...resume.data.projects];
                newList[idx].description = e.target.value;
                updateData({ projects: newList });
              }}
            />
          </div>
        </div>
      </div>
    ))}

    {(!resume.data.projects || resume.data.projects.length === 0) && (
      <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
        <Rocket size={32} className="mx-auto text-slate-200 mb-2" />
        <p className="text-slate-400 text-sm">Showcase your best work by adding a project.</p>
      </div>
    )}
  </div>
</div>

          {/* 6. LANGUAGES */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
        <LanguagesIcon size={18} />
      </div>
      Languages
    </h2>
    <button
      onClick={() =>
        updateData({
          languages: [
            ...(resume.data.languages || []),
            { name: "", proficiency: "Fluent" },
          ],
        })
      }
      className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all border border-rose-100"
    >
      <Plus size={14} strokeWidth={3} />
      ADD LANGUAGE
    </button>
  </div>

  <div className="p-6">
    <div className="grid grid-cols-1 gap-4">
      {resume.data.languages?.map((lang: any, idx: number) => (
        <div 
          key={idx} 
          className="flex flex-col sm:flex-row gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100 items-center group relative transition-all hover:bg-white hover:border-rose-200 hover:shadow-sm"
        >
          {/* Language Name Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="e.g. English"
              className="w-full pl-4 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm font-medium text-slate-700"
              value={lang.name}
              onChange={(e) => {
                const newList = [...resume.data.languages];
                newList[idx].name = e.target.value;
                updateData({ languages: newList });
              }}
            />
          </div>

          {/* Proficiency Select */}
          <div className="w-full sm:w-48">
            <select
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-xs font-bold text-slate-500 uppercase tracking-wide cursor-pointer appearance-none"
              value={lang.proficiency}
              onChange={(e) => {
                const newList = [...resume.data.languages];
                newList[idx].proficiency = e.target.value;
                updateData({ languages: newList });
              }}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'org/19/9 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
            >
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional">Professional</option>
              <option value="Beginner">Beginner</option>
            </select>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => {
              const newList = [...resume.data.languages];
              newList.splice(idx, 1);
              updateData({ languages: newList });
            }}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 sm:relative absolute top-1 right-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {(!resume.data.languages || resume.data.languages.length === 0) && (
        <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
          <p className="text-slate-400 text-xs italic">No languages added yet.</p>
        </div>
      )}
    </div>
  </div>
</div>

          {/* 7. CERTIFICATIONS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <h2 className="text-slate-800 font-bold flex items-center gap-2">
      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
        <Award size={18} />
      </div>
      Certifications
    </h2>
    <button
      onClick={() =>
        updateData({
          certifications: [
            ...(resume.data.certifications || []),
            { name: "", issuer: "", date: "" },
          ],
        })
      }
      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all border border-blue-100"
    >
      <Plus size={14} strokeWidth={3} />
      ADD CERTIFICATE
    </button>
  </div>

  <div className="p-6 space-y-4">
    {resume.data.certifications?.map((cert: any, idx: number) => (
      <div
        key={idx}
        className="relative p-4 bg-slate-50/50 border border-slate-100 rounded-xl group hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
      >
        {/* Delete Button */}
        <button
          onClick={() => {
            const newList = [...resume.data.certifications];
            newList.splice(idx, 1);
            updateData({ certifications: newList });
          }}
          className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={16} />
        </button>

        <div className="space-y-3">
          {/* Certificate Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Certification Name
            </label>
            <input
              type="text"
              placeholder="e.g. AWS Certified Solutions Architect"
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 text-sm"
              value={cert.name}
              onChange={(e) => {
                const newList = [...resume.data.certifications];
                newList[idx].name = e.target.value;
                updateData({ certifications: newList });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Issuer */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Issuing Organization
              </label>
              <input
                type="text"
                placeholder="e.g. Amazon Web Services"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-xs text-slate-600"
                value={cert.issuer}
                onChange={(e) => {
                  const newList = [...resume.data.certifications];
                  newList[idx].issuer = e.target.value;
                  updateData({ certifications: newList });
                }}
              />
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Issue Date
              </label>
              <input
                type="text"
                placeholder="e.g. March 2024"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-xs text-slate-600"
                value={cert.date}
                onChange={(e) => {
                  const newList = [...resume.data.certifications];
                  newList[idx].date = e.target.value;
                  updateData({ certifications: newList });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ))}

    {(!resume.data.certifications || resume.data.certifications.length === 0) && (
      <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
        <Award size={32} className="mx-auto text-slate-200 mb-2" />
        <p className="text-slate-400 text-xs italic">Add your professional certifications or licenses.</p>
      </div>
    )}
  </div>
</div>
        </section>
        {/* RIGHT SIDE: PREVIEW */}
        <section className="w-1/2 bg-slate-300 overflow-y-auto custom-scrollbar h-full p-0">
          {/* This wrapper now centers the page without scaling it */}
          <div className="flex justify-center items-start min-h-full w-full py-01  bg-slate-300">
            <div
              id="resume-preview"
              className="bg-white shadow-2xl"
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
                    ...resume.data,
                    personal: {
                      ...resume.data.personal,
                      image: tempImage,
                    },
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  Template Not Found
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .input-style {
          @apply border border-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
