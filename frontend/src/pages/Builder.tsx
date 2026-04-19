import { useBuilder } from "../hooks/useBuilder";
import {Award,LanguagesIcon, Rocket, ChevronDown ,Wrench , X, User,Briefcase,GraduationCap, Calendar, Camera,Plus, Trash2 } from "lucide-react";
import { TEMPLATES } from "../types/templateindex";
import { handlePrint } from "../utils/printUtils";
import BuilderHeader from "../components/BuilderHeader";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="bg-(--color-form-in) flex flex-col h-screen  text-slate-100">
      {/* TOOLBAR */}
<BuilderHeader
  productName="Resume"
  accentColor="text-green-600"
  buttonColor="bg-green-600"
  docTitle={resume.title}
  isSaving={saving}
  isDirty={isDirty}
  onSave={handleSave}
  onDownload={() => handlePrint("resume-template", "Resume")}
/>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDE: INPUT FORMS */}
<section className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 space-y-10 custom-scrollbar no-print">
          {/* 1. PERSONAL INFO */}
         <div className="bg-(--color-form-bg) rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
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
    <div className="flex items-center gap-6 p-4 bg-(--color-form-in) rounded-xl border border-dashed border-slate-200">
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
      
      </div>
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-(--color-form-bg) border text-(--form-text) border-slate-200 rounded-xl focus: focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="e.g. John Doe"
          value={resume.data.personal?.fullName || ""}
          onChange={(e) => updatePersonal("fullName", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Job Title</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-(--color-form-bg) border border-slate-200 rounded-xl focus: focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="e.g. Software Engineer"
          value={resume.data.personal?.jobTitle || ""}
          onChange={(e) => updatePersonal("jobTitle", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-2.5 bg-(--color-form-bg) border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="name@example.com"
          value={resume.data.personal?.email || ""}
          onChange={(e) => updatePersonal("email", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-(--color-form-bg) border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="+1 (555) 000-0000"
          value={resume.data.personal?.phone || ""}
          onChange={(e) => updatePersonal("phone", e.target.value)}
        />
      </div>

      <div className="space-y-1.5 md:col-span-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Location</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 bg-(--color-form-bg) border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="City, Country"
          value={resume.data.personal?.location || ""}
          onChange={(e) => updatePersonal("location", e.target.value)}
        />
      </div>

      <div className="space-y-1.5 md:col-span-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Professional Summary</label>
        <textarea
          className="w-full px-4 py-3 bg-(--color-form-bg) border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 min-h-[120px] resize-none"
          placeholder="Briefly describe your career background and key achievements..."
          value={resume.data.personal?.summary || ""}
          onChange={(e) => updatePersonal("summary", e.target.value)}
        />
      </div>
    </div>
  </div>
</div>
          {/* 2. EXPERIENCE */}
          <div className="bg-(--color-form-bg) rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
  {/* Section Header */}
  <div className="bg-slate-100/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
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
      className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all border border-emerald-100"
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
       

            <div className="space-y-1.5">
  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
    Company
  </label>
  <input
    type="text"
    placeholder="e.g. Google"
    className="w-full px-4 py-2.5 bg-(--color-form-bg) border border-slate-200 rounded-xl focus:focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
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
                className="w-full px-4 py-2 bg-(--color-form-bg) border border-slate-200 rounded-xl focus: focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
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
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
      Duration
    </label>
    <div className="relative flex items-center gap-2">
      {/* Start Date */}
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-2.5 text-slate-400" size={14} />
        <input
          type="date"
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-600"
          value={exp.startDate || ""}
          onChange={(e) => {
            const newList = [...resume.data.experience];
            newList[idx].startDate = e.target.value;
            updateData({ experience: newList });
          }}
        />
      </div>

      <span className="text-slate-400 text-sm">—</span>

      {/* End Date */}
      <div className="relative flex-1">
        <input
          type="date"
          className="w-full pl-4 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-600"
          value={exp.endDate || ""} // Changed from startDate to endDate
          onChange={(e) => {
            const newList = [...resume.data.experience];
            newList[idx].endDate = e.target.value; // Changed from startDate to endDate
            updateData({ experience: newList });
          }}
        />
      </div>
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
      className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-all border border-violet-100"
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

{/* 4. UNIVERSAL SKILLS */}
<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
<div className="bg-white px-6 py-4 border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
  <h2 className="text-slate-800 font-bold flex items-center gap-8 w-full">
    {/* Icon Container */}
    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0 border border-amber-100">
      <Wrench size={18} />
    </div>

    {/* Smooth Editable Input */}
    <input 
      className="w-full bg-transparent px-2 py-1.5 rounded-md
                 text-slate-800 font-bold outline-none
                 hover:bg-slate-50
                 focus:bg-amber-50/50 focus:ring-2 focus:ring-amber-200/50
                 transition-all duration-200"
      value={resume.data.sectionTitles?.skills ?? ""} 
      placeholder="Technical Skills"
      onChange={(e) => updateData({ 
        sectionTitles: { ...resume.data.sectionTitles, skills: e.target.value } 
      })}
    />
  </h2>
  
  {/* Subtle hint that it's editable */}
 
</div>

  <div className="p-6 space-y-5">
    <input
      type="text"
      placeholder="Press Enter to add (e.g. React, Surgery, Financial Analysis...)"
      className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const val = e.currentTarget.value.trim();
          if (val) {
            updateData({ skills: [...(resume.data.skills || []), val] });
            e.currentTarget.value = "";
          }
        }
      }}
    />

    <div className="flex flex-wrap gap-2">
      {resume.data.skills?.map((skill: string, idx: number) => (
        <div key={idx} className="group flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
          <span className="text-sm font-medium text-slate-600">{skill}</span>
          <button
            onClick={() => {
              const newList = resume.data.skills.filter((_: string, i: number) => i !== idx);
              updateData({ skills: newList });
            }}
            className="text-slate-300 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

{/* 5. PROJECTS / PROCEDURES / CASE STUDIES */}
<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-6">
  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {/* Icon Color changes based on selection to give visual feedback */}
      <div className={`p-2 rounded-xl transition-colors ${
        resume.data.sectionTitles?.projects === "Procedures" ? "bg-rose-100 text-rose-600" : 
        resume.data.sectionTitles?.projects === "Case Studies" ? "bg-amber-100 text-amber-600" :
        "bg-cyan-100 text-cyan-600"
      }`}>
        <Rocket size={18} />
      </div>

      <div className="relative group">
        {/* Custom Styled Select */}
        <select 
          className="appearance-none bg-white border border-slate-200 hover:border-cyan-500 pl-3 pr-8 py-1.5 rounded-lg text-sm font-bold text-slate-700 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-cyan-500/10"
          value={resume.data.sectionTitles?.projects || "Projects"}
          onChange={(e) => updateData({ 
            sectionTitles: { ...resume.data.sectionTitles, projects: e.target.value } 
          })}
        >
          <option value="Projects">Personal Projects</option>
          <option value="Procedures">Medical Procedures</option>
          <option value="Case Studies">Business Case Studies</option>
          <option value="Publications">Research Publications</option>
        </select>
        
        {/* Custom Chevron Arrow (prevents that "rough" default look) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
          <ChevronDown size={14} strokeWidth={3} />
        </div>
      </div>
    </div>
    
    <button
      onClick={() => updateData({
        projects: [...(resume.data.projects || []), { name: "", link: "", description: "" }],
      })}
      className="flex items-center gap-1.5 text-xs font-bold bg-white text-cyan-600 hover:bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-lg transition-all shadow-sm"
    >
      <Plus size={14} strokeWidth={3} /> ADD ITEM
    </button>
  </div>

  <div className="p-6 space-y-6">
    {resume.data.projects?.map((proj: any, idx: number) => {
      const isMedical = resume.data.sectionTitles?.projects === "Procedures";
      
      return (
        <div key={idx} className="p-5 border border-slate-200 rounded-2xl group relative">
          <button
            onClick={() => {
              const newList = [...resume.data.projects];
              newList.splice(idx, 1);
              updateData({ projects: newList });
            }}
            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                {isMedical ? "Procedure / Surgery" : "Project Name"}
              </label>
              <input 
                placeholder={isMedical ? "e.g. Laparoscopic Cholecystectomy" : "e.g. Portfolio Website"}
                className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20"
                value={proj.name}
                onChange={(e) => {
                  const newList = [...resume.data.projects];
                  newList[idx].name = e.target.value;
                  updateData({ projects: newList });
                }}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                {isMedical ? "Hospital / Ward" : "Link / URL"}
              </label>
              <input 
                placeholder={isMedical ? "e.g. General Surgery Dept" : "https://github.com..."}
                className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20"
                value={proj.link}
                onChange={(e) => {
                  const newList = [...resume.data.projects];
                  newList[idx].link = e.target.value;
                  updateData({ projects: newList });
                }}
              />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              {isMedical ? "Outcome & Details" : "Description & Tools"}
            </label>
            <textarea 
              placeholder={isMedical ? "Describe your role in the procedure and the results..." : "Describe the project..."}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl min-h-[100px] outline-none focus:ring-2 focus:ring-cyan-500/20"
              value={proj.description}
              onChange={(e) => {
                const newList = [...resume.data.projects];
                newList[idx].description = e.target.value;
                updateData({ projects: newList });
              }}
            />
          </div>
        </div>
      );
    })}
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

<div className="absolute left-1/2 -translate-x-1/2 top-0 
                h-full w-[1px] 
                bg-gradient-to-b from-transparent 
                via-slate-300/60 
                to-transparent" />



        {/* RIGHT SIDE: PREVIEW */}
     <section className="w-1/2 bg-slate-300 overflow-y-auto custom-scrollbar h-full">
  <div className="flex justify-center items-start min-h-full w-full py-12 bg-slate-300">
    <div
      id="resume-preview"
     
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
            ...resume.data,
            personal: {
              ...resume.data.personal,
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
          @apply border border-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
