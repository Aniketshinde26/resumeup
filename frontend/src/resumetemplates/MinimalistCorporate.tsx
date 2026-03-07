import type { ResumeData } from "../types/templateindex";

export default function CorporateTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white flex shadow-sm font-sans text-slate-800 box-border overflow-hidden"
    >
      {/* LEFT SIDEBAR (1/3 of the page) */}
      <aside className="w-[75mm] bg-slate-900 text-white p-8 flex flex-col shrink-0">
        {/* PHOTO */}
        {data.personal?.image && (
          <div className="mb-8 flex justify-center">
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-xl"
            />
          </div>
        )}

        <div className="space-y-8">
          {/* CONTACT */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
              Contact
            </h2>
            <div className="space-y-3 text-[11px] text-slate-300">
              {data.personal?.location && (
                <p className="flex items-center gap-2">
                  📍 {data.personal.location}
                </p>
              )}
              {data.personal?.email && (
                <p className="flex items-center gap-2 break-all">
                  ✉️ {data.personal.email}
                </p>
              )}
              {data.personal?.phone && (
                <p className="flex items-center gap-2">
                  📞 {data.personal.phone}
                </p>
              )}
            </div>
          </section>

          {/* DYNAMIC SKILLS SECTION */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1 truncate">
              {data.sectionTitles?.skills || "Skills"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-800 text-slate-200 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
              Education
            </h2>
            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <p className="text-[11px] font-bold text-white leading-tight">{edu.degree}</p>
                <p className="text-[10px] text-slate-400">{edu.school}</p>
                <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-tighter">{edu.year}</p>
              </div>
            ))}
          </section>

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-white uppercase tracking-wider">{lang.name}</span>
                      <span className="text-[9px] text-slate-400 italic lowercase">
                        {lang.proficiency}
                      </span>
                    </div>
                    <div className="w-full h-[2px] bg-slate-800 rounded-full">
                      <div className="w-full h-full bg-blue-500 rounded-full opacity-50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT (2/3 of the page) */}
      <main className="flex-1 p-10 flex flex-col">
        {/* NAME & TITLE */}
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="text-blue-600">
              {" "}
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl font-medium text-slate-500 mt-1 tracking-wide">
            {data.personal?.jobTitle}
          </p>
        </header>

        {/* SUMMARY */}
        {data.personal?.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-3">
              About Me <span className="h-[2px] bg-slate-100 flex-1"></span>
            </h2>
            <p className="text-[12px] text-slate-600 leading-relaxed italic">
              {data.personal.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
            Experience <span className="h-[2px] bg-slate-100 flex-1"></span>
          </h2>
          <div className="space-y-6">
            {data.experience?.map((exp, i) => (
              <div
                key={i}
                className="relative pl-6 border-l-2 border-slate-100"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-blue-600 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-slate-900 uppercase tracking-tight">
                    {exp.position}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-blue-600 mb-2">
                  {exp.company}
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DYNAMIC PROJECTS / RESEARCH SECTION */}
        {data.projects && data.projects.length > 0 && (
          <section className="mt-auto">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-3">
              {data.sectionTitles?.projects || "Projects"} 
              <span className="h-[2px] bg-slate-100 flex-1"></span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-1"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-[12px] text-slate-900 leading-tight">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      /* Smart Label/Link Logic */
                      proj.link.startsWith('http') ? (
                        <a href={proj.link} className="text-[9px] text-blue-600 font-bold uppercase shrink-0 hover:underline">Link</a>
                      ) : (
                        <span className="text-[9px] text-slate-400 italic shrink-0">{proj.link}</span>
                      )
                    )}
                  </div>
                  <p className="text-[10px] text-slate-600 leading-snug whitespace-pre-line">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}