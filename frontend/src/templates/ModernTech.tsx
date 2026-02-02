import type { ResumeData } from "./templateindex";

export default function TechTemplate({ data }: { data: ResumeData }) {
  return (

      <div
        id="resume-template"
        className="mx-auto w-[210mm] h-[297mm] bg-white p-[10mm] font-sans overflow-hidden box-border relative shadow-2xl print:shadow-none"
      >

        {/* HEADER */}
        <header className="flex justify-between items-center mb-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              {data.personal?.fullName?.split(" ")[0]}
              <span className="text-blue-600 ml-2">
                {data.personal?.fullName?.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-lg font-bold text-slate-500 mt-1 uppercase tracking-tight">
              {data.personal?.jobTitle}
            </p>
            <div className="flex gap-3 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{data.personal?.location}</span>
              <span>•</span>
              <span>{data.personal?.email}</span>
              {data.personal?.phone && (
                <>
                  <span>•</span>
                  <span>{data.personal.phone}</span>
                </>
              )}
            </div>
          </div>
          {data.personal?.image && (
            <img
              src={data.personal.image}
              className="w-20 h-20 rounded-xl rotate-2 shadow-md object-cover border-2 border-white"
              alt="Profile"
            />
          )}
        </header>

        {/* --- ADDED SUMMARY SECTION HERE --- */}
        {data.personal?.summary && (
          <section className="mb-8 px-2">
            <h2 className="text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600"></span> Summary
            </h2>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {data.personal.summary}
            </p>
          </section>
        )}
        {/* ---------------------------------- */}

        <div className="grid grid-cols-12 gap-8">
          {/* MAIN COLUMN (Left) */}
          <div className="col-span-8 space-y-6">
            <section className="no-break">
              <h2 className="text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600"></span> Experience
              </h2>
              <div className="space-y-6 relative border-l-2 border-slate-100 ml-2 pl-6">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="relative no-break">
                    <div className="absolute left-[-29px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                    <h3 className="font-bold text-slate-900 text-sm leading-tight uppercase">
                      {exp.position}
                    </h3>
                    <p className="text-[11px] text-blue-600 mt-0.5 font-bold uppercase tracking-wide">
                      {exp.company} <span className="text-slate-300 mx-1">|</span> {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed italic whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {data.projects && data.projects.length > 0 && (
              <section className="no-break">
                <h2 className="text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600"></span> Projects
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100 no-break">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-slate-800 text-[12px] uppercase">{proj.name}</h3>
                        <span className="text-[9px] text-blue-500 font-mono">{proj.link}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug whitespace-pre-line">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR (Right) */}
          <div className="col-span-4 space-y-6">
            <section className="no-break">
              <h2 className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-4">Skills</h2>
              <div className="space-y-3">
                {data.skills?.map((skill, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] font-black text-slate-600 uppercase">{skill}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-slate-800 group-hover:bg-blue-600 transition-all"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 p-5 rounded-xl text-white no-break shadow-lg">
              <h2 className="text-blue-400 font-black text-[11px] uppercase tracking-[0.2em] mb-4">Education</h2>
              {data.education?.map((edu, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <p className="text-xs font-bold leading-tight text-white uppercase">{edu.degree}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{edu.school}</p>
                  <p className="text-[9px] text-blue-400 font-bold mt-1 tracking-widest">{edu.year}</p>
                </div>
              ))}
            </section>

            {/* CERTIFICATIONS */}
            {data.certifications && data.certifications.length > 0 && (
              <section className="no-break">
                <h2 className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-3">Certifications</h2>
                <div className="space-y-3">
                  {data.certifications.map((cert, i) => (
                    <div key={i} className="border-l-2 border-blue-500 pl-3 py-1">
                      <p className="text-[10px] font-bold text-slate-800 uppercase leading-tight">{cert.name}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {data.languages && data.languages.length > 0 && (
              <section className="no-break">
                <h2 className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-3">Languages</h2>
                <div className="flex flex-col gap-2">
                  {data.languages.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-100 px-2 py-1.5 rounded border border-slate-200">
                      <span className="text-[9px] font-bold text-slate-700 uppercase">
                        {typeof lang === 'string' ? lang : lang.name}
                      </span>
                      {typeof lang !== 'string' && lang.proficiency && (
                        <span className="text-[8px] font-medium text-blue-600 italic">
                          {lang.proficiency}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    
  );
}