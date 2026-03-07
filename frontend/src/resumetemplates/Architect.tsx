import type { ResumeData } from "../types/templateindex";

export default function ProfessionalSplitTemplate({
  data,
}: {
  data: ResumeData;
}) {
  return (
    <div
      id="resume-template"
className="w-full h-full bg-white flex font-sans text-slate-800"    >
      {/* LEFT COLUMN - Primary Content (Experience & Projects) */}
      <main className="flex-[1.6] p-12 pr-8 bg-white">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="block text-indigo-600 leading-none">
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-slate-400 mt-4">
            {data.personal?.jobTitle}
          </p>
        </header>

        {data.personal?.summary && (
          <section className="mb-10">
            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-indigo-600"></span> Profile
            </h2>
            <p className="text-[12px] text-slate-600 leading-relaxed text-justify">
              {data.personal.summary}
            </p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-indigo-600"></span> Experience
          </h2>
          <div className="space-y-8">
            {data.experience?.map((exp, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-[14px] uppercase tracking-tight">
                    {exp.position}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-bold text-indigo-600 mb-2 uppercase italic">
                  {exp.company}
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DYNAMIC PROJECTS / PROCEDURES SECTION */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-indigo-600"></span> 
              {data.sectionTitles?.projects || "Key Projects"}
            </h2>
            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-4 rounded-r-lg border-l-2 border-indigo-600"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      /* Smart Link Logic: If it looks like a URL, make it a link. Otherwise, show as text label */
                      proj.link.startsWith('http') ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-indigo-600 font-bold hover:underline uppercase tracking-tighter"
                        >
                          View Work
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase italic">
                          {proj.link}
                        </span>
                      )
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

      {/* RIGHT COLUMN */}
      <aside className="flex-1 bg-slate-50 border-l border-slate-100 p-10 flex flex-col gap-10">
        {data.personal?.image && (
          <img
            src={data.personal.image}
            alt="Profile"
            className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg mx-auto"
          />
        )}

        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Contact
          </h2>
          <div className="space-y-3 text-[11px] text-slate-600 font-medium">
            <p className="flex items-center gap-2">
              ✉️ <span className="break-all">{data.personal?.email}</span>
            </p>
            <p className="flex items-center gap-2">📞 {data.personal?.phone}</p>
            <p className="flex items-center gap-2">
              📍 {data.personal?.location}
            </p>
          </div>
        </section>

        {/* DYNAMIC SKILLS SECTION */}
        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            {data.sectionTitles?.skills || "Expertise"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, i) => (
              <span
                key={i}
                className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded shadow-sm font-bold"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Education
          </h2>
          {data.education?.map((edu, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <p className="text-[11px] font-bold text-slate-900 leading-tight">
                {edu.degree}
              </p>
              <p className="text-[10px] text-slate-500">{edu.school}</p>
              <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                {edu.year}
              </p>
            </div>
          ))}
        </section>

        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Languages
            </h2>
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div key={i}>
                  <p className="text-[11px] font-bold text-slate-800">
                    {lang.name}
                  </p>
                  <p className="text-[10px] text-indigo-600 font-medium italic">
                    {lang.proficiency}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Certifications
            </h2>
            <div className="space-y-4">
              {data.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="text-[11px] border-l-2 border-slate-200 pl-3"
                >
                  <p className="font-bold text-slate-800 leading-tight">
                    {cert.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  );
}