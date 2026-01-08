import type { ResumeData } from "../templates/templateindex";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] h-[297mm] bg-white flex flex-col shadow-sm overflow-hidden box-border font-sans"
      style={{ margin: 0, padding: 0 }}
    >
      {/* DARK TOP HEADER */}
      <header className="bg-slate-900 text-white p-12 flex justify-between items-center">
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
        {/* LEFT COLUMN - EXPERIENCE & SUMMARY */}
        <main className="flex-[2] p-12 bg-white">
          <section className="mb-10">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-slate-900"></span> WORK
            </h2>
            <div className="space-y-8">
              {data.experience?.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-slate-100"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <p className="text-sm text-slate-500 mb-2">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-slate-900"></span> PROJECTS
              </h2>
              <div className="space-y-6">
                {data.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 border-l-2 border-slate-100"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    {proj.link && (
                      <p className="text-xs text-blue-600 mb-1">{proj.link}</p>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT COLUMN - SKILLS & EDUCATION */}
        <aside className="flex-1 bg-slate-50 p-10">
          {/* CONTACT INFO */}
          <section className="mb-8">
            <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
              CONTACT
            </h2>
            <div className="space-y-2 text-xs text-slate-600">
              {data.personal?.email && <p>✉️ {data.personal.email}</p>}
              {data.personal?.phone && <p>📞 {data.personal.phone}</p>}
              {data.personal?.location && <p>📍 {data.personal.location}</p>}
            </div>
          </section>

          {/* SUMMARY */}
          {data.personal?.summary && (
            <section className="mb-10">
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
                SUMMARY
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.personal.summary}
              </p>
            </section>
          )}

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <section className="mb-10">
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
                EDUCATION
              </h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-4 text-xs">
                  <p className="font-bold">{edu.school}</p>
                  <p className="italic text-slate-500">{edu.degree}</p>
                  <p className="text-slate-400 text-[10px]">{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-10">
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="text-[10px] font-bold text-slate-700 bg-slate-200 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section className="mb-10">
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang, idx) => (
                  <p key={idx} className="text-xs text-slate-700">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-slate-400 text-[10px] ml-2">
                      ({lang.proficiency})
                    </span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
                CERTIFICATIONS
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-slate-700">{cert.name}</p>
                    <p className="text-slate-500 text-[10px]">
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
