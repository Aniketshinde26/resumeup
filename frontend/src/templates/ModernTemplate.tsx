import type { ResumeData } from "../templates/templateindex";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white flex flex-col shadow-sm box-border font-sans text-slate-900"
      style={{ margin: 0, padding: 0 }}
    >
      {/* DARK TOP HEADER */}
      <header className="bg-slate-900 text-white p-10 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="text-slate-400 font-light">
              {" "}
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-slate-400 tracking-[0.3em] uppercase text-sm mt-2">
            {data.personal?.jobTitle}
          </p>
        </div>
        {data.personal?.image && (
          <img
            src={data.personal.image}
            alt="Profile"
            className="w-24 h-24 border-4 border-slate-700 object-cover"
          />
        )}
      </header>

      <div className="flex flex-1">
        {/* LEFT COLUMN - WORK & PROJECTS */}
        <main className="flex-[2] p-10 bg-white border-r border-slate-100">
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-slate-900"></span> WORK
            </h2>
            <div className="space-y-8">
              {data.experience?.map((exp, idx) => (
                <div key={idx} className="flex gap-4 break-inside-avoid">
                  {/* Timeline Dot & Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-white border-2 border-slate-900 rounded-full z-10"></div>
                    <div className="w-[2px] flex-1 bg-slate-100 -mt-1"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                      {exp.position}
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-2 font-medium">
                      {exp.company} | {exp.startDate} — {exp.endDate}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.projects && data.projects.length > 0 && (
            <section className="mb-8 break-inside-avoid">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-slate-900"></span> PROJECTS
              </h2>
              <div className="space-y-6">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="flex gap-4 break-inside-avoid">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-white border-2 border-slate-900 rounded-full z-10"></div>
                      <div className="w-[2px] flex-1 bg-slate-100 -mt-1"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm uppercase">
                        {proj.name}
                      </h3>
                      {proj.link && (
                        <p className="text-[10px] text-blue-600 mb-1 italic">
                          {proj.link}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT COLUMN - SIDEBAR */}
        <aside className="flex-1 bg-slate-50 p-8">
          <section className="mb-8 break-inside-avoid">
            <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
              CONTACT
            </h2>
            <div className="space-y-2 text-[10px] text-slate-600">
              {data.personal?.email && (
                <p className="truncate">✉️ {data.personal.email}</p>
              )}
              {data.personal?.phone && <p>📞 {data.personal.phone}</p>}
              {data.personal?.location && <p>📍 {data.personal.location}</p>}
            </div>
          </section>

          {data.personal?.summary && (
            <section className="mb-8 break-inside-avoid">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1 text-justify">
                SUMMARY
              </h2>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                {data.personal.summary}
              </p>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section className="mb-8 break-inside-avoid">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                EDUCATION
              </h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-4 text-[10px]">
                  <p className="font-bold uppercase">{edu.school}</p>
                  <p className="italic text-slate-500">{edu.degree}</p>
                  <p className="text-slate-400 text-[9px]">{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section className="mb-8 break-inside-avoid">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="text-[9px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-4">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="text-[10px]">
                    <p className="font-bold text-slate-700 leading-tight uppercase">
                      {cert.name}
                    </p>
                    <p className="text-slate-500 text-[9px] mt-1">
                      {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
