import type { ResumeData } from "../types/templateindex";
import { formatSocialUrl } from "../utils/formatUrl";

export default function NeoProfessionalTemplate({
  data,
}: {
  data: ResumeData;
}) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white font-sans text-slate-800 flex flex-col overflow-hidden box-border shadow-lg"
      style={{ margin: "0 auto" }}
    >
      <header className="bg-slate-50 p-10 border-b-4 border-indigo-600 flex justify-between items-center shrink-0">
        <div className="flex-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
            {data.personal?.fullName}
          </h1>
          <p className="text-lg font-semibold text-indigo-600 mt-2 uppercase tracking-[0.2em]">
            {data.personal?.jobTitle}
          </p>

          <div className="flex flex-wrap gap-y-2 gap-x-6 mt-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {data.personal?.location && (
              <div className="flex items-center gap-1">
                📍 {data.personal.location}
              </div>
            )}
            {data.personal?.email && (
              <div className="flex items-center gap-1 text-indigo-600 underline">
                ✉️ {data.personal.email}
              </div>
            )}
            {data.personal?.phone && (
              <div className="flex items-center gap-1">
                📞 {data.personal.phone}
              </div>
            )}
            {data.personal?.linkedin && (
              <div className="flex items-center gap-1 normal-case break-all">
                🔗 {formatSocialUrl(data.personal.linkedin)}
              </div>
            )}
            {data.personal?.github && (
              <div className="flex items-center gap-1 normal-case break-all">
                🔗 {formatSocialUrl(data.personal.github)}
              </div>
            )}
          </div>
        </div>

        {data.personal?.image && (
          <div className="shrink-0 ml-8">
            <img
              src={data.personal.image}
              className="w-28 h-28 rounded-xl object-cover border-2 border-white shadow-md rotate-2"
              alt="Profile"
            />
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-[1.8] p-10 overflow-hidden border-r border-slate-100">
          {data.personal?.summary && (
            <section className="mb-10 no-break">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                Professional Mission
              </h2>
              <p className="text-[13px] text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                {data.personal.summary}
              </p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
              {data.sectionTitles?.experience || "Work Experience"}
            </h2>
            <div className="space-y-8">
              {data.experience?.map((exp, i) => (
                <div key={i} className="group relative no-break">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-black text-slate-900 uppercase">
                      {exp.position}
                    </h3>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 mb-3">
                    {exp.company}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section className="no-break">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                {data.sectionTitles?.projects || "Projects"}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.map((proj, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-200 no-break"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-black text-[12px] text-slate-900 uppercase">
                        {proj.name}
                      </h3>
                      {proj.link && (
                        <span className="text-[10px]">
                          {proj.link.startsWith('http') ? (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">
                              VIEW LINK
                            </a>
                          ) : (
                            <span className="text-slate-400 italic font-medium">{proj.link}</span>
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug whitespace-pre-line">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="flex-1 bg-white p-10 flex flex-col gap-10 overflow-hidden">
          <section className="no-break">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-5">
              {data.sectionTitles?.skills || "Skills"}
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {data.skills?.map((skill, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-indigo-600"></span>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </section>

          <section className="no-break">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-5">
              Education
            </h2>
            <div className="space-y-6">
              {data.education?.map((edu, i) => (
                <div key={i} className="relative">
                  <p className="text-[11px] font-black text-slate-900 uppercase leading-tight">
                    {edu.degree}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">
                    {edu.school}
                  </p>
                  <p className="text-[10px] text-indigo-400 font-bold mt-1">
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {data.languages && data.languages.length > 0 && (
            <section className="no-break">
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-5">
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-slate-50 pb-2"
                  >
                    <span className="text-[11px] font-bold text-slate-700 uppercase">
                      {lang.name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 italic">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="no-break">
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-5">
                Certificates
              </h2>
              <div className="space-y-4">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="group">
                    <p className="text-[10px] font-black text-slate-900 uppercase group-hover:text-indigo-600 transition-colors">
                      {cert.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">
                      {cert.date}
                    </p>
                    {cert.link && (
                      <p className="text-[8px] text-indigo-600 break-all leading-snug mt-1">
                        {cert.link}
                      </p>
                    )}
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