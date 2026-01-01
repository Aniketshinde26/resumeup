import { useBuilder } from "../hooks/useBuilder";
import { Plus, Trash2, Layout } from "lucide-react";
import { TEMPLATES, TEMPLATE_LIST } from "../templates/templateindex";

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
      <header className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span className="text-blue-600 font-bold text-xl">ResumeUp</span>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="font-medium text-slate-600">{resume.title}</h1>
        </div>
        <div className="flex items-center gap-4">
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
        <section className="w-1/2 overflow-y-auto p-8 border-r space-y-10 custom-scrollbar">
          {/* 0. TEMPLATE PICKER */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-800 font-bold">
              <Layout size={18} />
              <span>Active Template:</span>
            </div>
            <select
              className="bg-white border border-blue-200 rounded p-1 text-sm outline-none"
              value={resume.templateId || "minimal"}
              onChange={(e) => updateData({ templateId: e.target.value })}
            >
              {TEMPLATE_LIST.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* 1. PERSONAL INFO */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-2">
              👤 Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex items-center gap-4 ...">
                <label className="relative cursor-pointer group">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTempImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  {/* ✅ Use tempImage instead of resume.data.personal.image */}
                  {tempImage ? (
                    <img
                      src={tempImage}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
                      <Plus size={24} />
                    </div>
                  )}
                </label>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">
                      Profile Photo
                    </label>
                    {tempImage && (
                      <button
                        onClick={() => setTempImage(null)} // Clear only local state
                        className="text-red-500 text-[10px] font-bold"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 mb-1">
                    Click circle to upload or paste URL below
                  </p>

                  <input
                    type="text"
                    placeholder="Paste image URL here..."
                    className="input-style w-full text-xs py-1"
                    // If it's a base64 string, we don't want to show the massive text block
                    value={
                      resume.data.personal?.image?.startsWith("data:")
                        ? "Local Image Uploaded"
                        : resume.data.personal?.image || ""
                    }
                    onChange={(e) => updatePersonal("image", e.target.value)}
                  />
                </div>
              </div>
              {/* EXISTING INPUTS */}
              <input
                type="text"
                placeholder="Full Name"
                className="input-style"
                value={resume.data.personal?.fullName || ""}
                onChange={(e) => updatePersonal("fullName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Job Title"
                className="input-style"
                value={resume.data.personal?.jobTitle || ""}
                onChange={(e) => updatePersonal("jobTitle", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-style"
                value={resume.data.personal?.email || ""}
                onChange={(e) => updatePersonal("email", e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                className="input-style"
                value={resume.data.personal?.phone || ""}
                onChange={(e) => updatePersonal("phone", e.target.value)}
              />
              <input
                type="text"
                placeholder="Location (City, Country)"
                className="input-style col-span-2"
                value={resume.data.personal?.location || ""}
                onChange={(e) => updatePersonal("location", e.target.value)}
              />
            </div>

            <textarea
              placeholder="Professional Summary"
              className="input-style w-full h-24"
              value={resume.data.personal?.summary || ""}
              onChange={(e) => updatePersonal("summary", e.target.value)}
            />
          </div>
          {/* 2. EXPERIENCE */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                💼 Experience
              </h2>
              <button
                onClick={() =>
                  updateData({
                    experience: [
                      ...(resume.data.experience || []),
                      {
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      },
                    ],
                  })
                }
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
              >
                <Plus size={20} />
              </button>
            </div>
            {resume.data.experience?.map((exp: any, idx: number) => (
              <div
                key={idx}
                className="p-4 border rounded-lg space-y-3 relative group bg-slate-50/50"
              >
                <button
                  onClick={() => {
                    const newList = [...resume.data.experience];
                    newList.splice(idx, 1);
                    updateData({ experience: newList });
                  }}
                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Company"
                  className="input-style w-full font-bold"
                  value={exp.company}
                  onChange={(e) => {
                    const newList = [...resume.data.experience];
                    newList[idx].company = e.target.value;
                    updateData({ experience: newList });
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role"
                    className="input-style"
                    value={exp.position}
                    onChange={(e) => {
                      const newList = [...resume.data.experience];
                      newList[idx].position = e.target.value;
                      updateData({ experience: newList });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Jan 2022 - Present"
                    className="input-style"
                    value={`${exp.startDate}${
                      exp.endDate ? " - " + exp.endDate : ""
                    }`}
                    onChange={(e) => {
                      const newList = [...resume.data.experience];
                      const parts = e.target.value.split("-");
                      newList[idx].startDate = parts[0]?.trim() || "";
                      newList[idx].endDate = parts[1]?.trim() || "";
                      updateData({ experience: newList });
                    }}
                  />
                </div>
                <textarea
                  placeholder="Job Description (use new lines for bullets)"
                  className="input-style w-full h-20 text-sm"
                  value={exp.description}
                  onChange={(e) => {
                    const newList = [...resume.data.experience];
                    newList[idx].description = e.target.value;
                    updateData({ experience: newList });
                  }}
                />
              </div>
            ))}
          </div>

          {/* 3. EDUCATION */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                🎓 Education
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
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
              >
                <Plus size={20} />
              </button>
            </div>
            {resume.data.education?.map((edu: any, idx: number) => (
              <div
                key={idx}
                className="p-4 border rounded-lg space-y-3 relative group"
              >
                <button
                  onClick={() => {
                    const newList = [...resume.data.education];
                    newList.splice(idx, 1);
                    updateData({ education: newList });
                  }}
                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="School/University"
                  className="input-style w-full font-bold"
                  value={edu.school}
                  onChange={(e) => {
                    const newList = [...resume.data.education];
                    newList[idx].school = e.target.value;
                    updateData({ education: newList });
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Degree"
                    className="input-style"
                    value={edu.degree}
                    onChange={(e) => {
                      const newList = [...resume.data.education];
                      newList[idx].degree = e.target.value;
                      updateData({ education: newList });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    className="input-style"
                    value={edu.year}
                    onChange={(e) => {
                      const newList = [...resume.data.education];
                      newList[idx].year = e.target.value;
                      updateData({ education: newList });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 4. SKILLS */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold border-b pb-2">🛠️ Skills</h2>
            <input
              type="text"
              placeholder="Add skill and press Enter"
              className="input-style w-full"
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
            <div className="flex flex-wrap gap-2">
              {resume.data.skills?.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-slate-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => {
                      const newList = resume.data.skills.filter(
                        (_: string, i: number) => i !== idx
                      );
                      updateData({ skills: newList });
                    }}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 5. PROJECTS */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                🚀 Projects
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
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            {resume.data.projects?.map((proj: any, idx: number) => (
              <div
                key={idx}
                className="p-4 border rounded-lg space-y-3 relative group bg-slate-50/30"
              >
                <button
                  onClick={() => {
                    const newList = [...resume.data.projects];
                    newList.splice(idx, 1);
                    updateData({ projects: newList });
                  }}
                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="input-style w-full font-bold"
                  value={proj.name}
                  onChange={(e) => {
                    const newList = [...resume.data.projects];
                    newList[idx].name = e.target.value;
                    updateData({ projects: newList });
                  }}
                />
                <input
                  type="text"
                  placeholder="Project Link (Optional)"
                  className="input-style w-full text-sm italic"
                  value={proj.link}
                  onChange={(e) => {
                    const newList = [...resume.data.projects];
                    newList[idx].link = e.target.value;
                    updateData({ projects: newList });
                  }}
                />
                <textarea
                  placeholder="Short description of what you built..."
                  className="input-style w-full h-16 text-sm"
                  value={proj.description}
                  onChange={(e) => {
                    const newList = [...resume.data.projects];
                    newList[idx].description = e.target.value;
                    updateData({ projects: newList });
                  }}
                />
              </div>
            ))}
          </div>

          {/* 6. LANGUAGES */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                🌍 Languages
              </h2>
              <button
                onClick={() =>
                  updateData({
                    languages: [
                      ...(resume.data.languages || []),
                      { name: "", level: "Fluent" },
                    ],
                  })
                }
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {resume.data.languages?.map((lang: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center group">
                  <input
                    type="text"
                    placeholder="Language"
                    className="input-style flex-1"
                    value={lang.name}
                    onChange={(e) => {
                      const newList = [...resume.data.languages];
                      newList[idx].name = e.target.value;
                      updateData({ languages: newList });
                    }}
                  />
                  <select
                    className="input-style text-sm"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newList = [...resume.data.languages];
                      newList[idx].proficiency = e.target.value;
                      updateData({ languages: newList });
                    }}
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Beginner">Beginner</option>
                  </select>
                  <button
                    onClick={() => {
                      const newList = [...resume.data.languages];
                      newList.splice(idx, 1);
                      updateData({ languages: newList });
                    }}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. CERTIFICATIONS */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                📜 Certifications
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
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            {resume.data.certifications?.map((cert: any, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-2 gap-2 p-3 border rounded-lg relative group"
              >
                <button
                  onClick={() => {
                    const newList = [...resume.data.certifications];
                    newList.splice(idx, 1);
                    updateData({ certifications: newList });
                  }}
                  className="absolute -top-2 -right-2 bg-white border shadow-sm rounded-full p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <Trash2 size={14} />
                </button>
                <input
                  type="text"
                  placeholder="Certificate Name"
                  className="input-style col-span-2 font-bold"
                  value={cert.name}
                  onChange={(e) => {
                    const newList = [...resume.data.certifications];
                    newList[idx].name = e.target.value;
                    updateData({ certifications: newList });
                  }}
                />
                <input
                  type="text"
                  placeholder="Issuer (e.g. AWS)"
                  className="input-style text-xs"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newList = [...resume.data.certifications];
                    newList[idx].issuer = e.target.value;
                    updateData({ certifications: newList });
                  }}
                />
                <input
                  type="text"
                  placeholder="Date"
                  className="input-style text-xs"
                  value={cert.date}
                  onChange={(e) => {
                    const newList = [...resume.data.certifications];
                    newList[idx].date = e.target.value;
                    updateData({ certifications: newList });
                  }}
                />
              </div>
            ))}
          </div>
        </section>
        {/* RIGHT SIDE: PREVIEW */}
        <section className="w-1/2 bg-slate-300 overflow-y-auto custom-scrollbar h-full">
          <div className="flex justify-center items-start min-h-full w-full py-10">
            <div
              id="resume-preview"
              className="origin-top scale-[0.65] xl:scale-[0.85] shadow-2xl transition-all"
              style={{
                marginBottom: "-15%",
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
                <div className="w-[210mm] h-[297mm] bg-white flex items-center justify-center">
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
