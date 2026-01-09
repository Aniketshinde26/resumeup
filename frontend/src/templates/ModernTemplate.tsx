import type { ResumeData } from "../templates/templateindex";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      // Changed h-[297mm] to min-h-[297mm] and removed overflow-hidden
      className="w-[210mm] min-h-[297mm] bg-white flex flex-col shadow-sm box-border font-sans"
      style={{ margin: 0, padding: 0 }}
    >
      {/* DARK TOP HEADER - Reduced padding from p-12 to p-10 */}
      <header className="bg-slate-900 text-white p-10 flex justify-between items-center">
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
        {/* LEFT COLUMN - Reduced padding from p-12 to p-10 */}
        <main className="flex-2 p-10 bg-white">
          <section className="mb-8">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-slate-900"></span> WORK
            </h2>
            <div className="space-y-6">
              {data.experience?.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-slate-100"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {exp.position}
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-1">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-slate-900"></span> PROJECTS
              </h2>
              <div className="space-y-5">
                {data.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 border-l-2 border-slate-100"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <p className="text-[10px] text-blue-600 mb-1">
                        {proj.link}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT COLUMN - Reduced vertical spacing between sections */}
        <aside className="flex-1 bg-slate-50 p-8 border-l border-slate-100">
          {/* CONTACT INFO */}
          <section className="mb-6">
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

          {/* SUMMARY */}
          {data.personal?.summary && (
            <section className="mb-6">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                SUMMARY
              </h2>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                {data.personal.summary}
              </p>
            </section>
          )}

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                EDUCATION
              </h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-3 text-[10px]">
                  <p className="font-bold">{edu.school}</p>
                  <p className="italic text-slate-500">{edu.degree}</p>
                  <p className="text-slate-400 text-[9px]">{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="text-[9px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                LANGUAGES
              </h2>
              <div className="space-y-1.5">
                {data.languages.map((lang, idx) => (
                  <p key={idx} className="text-[10px] text-slate-700">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-slate-400 text-[9px] ml-2">
                      ({lang.proficiency})
                    </span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS - Now has more space */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="font-bold text-xs text-slate-900 mb-3 border-b border-slate-300 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="text-[10px]">
                    <p className="font-bold text-slate-700 leading-tight">
                      {cert.name}
                    </p>
                    <p className="text-slate-500 text-[9px]">
                      {cert.issuer} • {cert.date}
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
