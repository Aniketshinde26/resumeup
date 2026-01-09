import type { ResumeData } from "../templates/templateindex";

export default function CorporateTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white p-12 shadow-sm font-serif text-slate-800"
    >
      {/* HEADER */}
      <div className="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start">
        <div className="flex gap-6 items-center">
          {/* PHOTO */}
          {data.personal?.image && (
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-24 h-24 object-cover grayscale border border-slate-200 shadow-sm"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-widest text-slate-900">
              {data.personal?.fullName}
            </h1>
            <p className="text-lg text-slate-600 font-medium italic mt-1">
              {data.personal?.jobTitle}
            </p>
          </div>
        </div>

        <div className="text-right text-[10px] space-y-1 text-slate-500 uppercase tracking-wider">
          <p>{data.personal?.location}</p>
          <p>{data.personal?.email}</p>
          <p>{data.personal?.phone}</p>
        </div>
      </div>

      {/* NEW: PROFESSIONAL SUMMARY SECTION */}
      {data.personal?.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-3 pb-1 text-slate-900">
            Professional Profile
          </h2>
          <p className="text-[11px] text-slate-700 leading-relaxed text-justify italic">
            {data.personal.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-12 gap-10">
        {/* MAIN COLUMN (LEFT) */}
        <div className="col-span-8 space-y-8">
          {/* EXPERIENCE */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-4 pb-1 text-slate-900">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience?.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[13px] text-slate-900">
                      {exp.position}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono italic">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-slate-700 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS WITH LINKS */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-4 pb-1 text-slate-900">
                Key Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-slate-100 pl-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[12px]">{proj.name}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[9px] text-blue-800 hover:text-blue-600 underline font-sans"
                        >
                          🔗 {proj.link.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR COLUMN (RIGHT) */}
        <div className="col-span-4 space-y-8">
          {/* SKILLS */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-3 pb-1 text-slate-900">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills?.map((skill, i) => (
                <span key={i} className="text-[11px] text-slate-700">
                  • {skill}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-3 pb-1 text-slate-900">
              Education
            </h2>
            {data.education?.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-[11px] font-bold text-slate-800">
                  {edu.degree}
                </p>
                <p className="text-[10px] text-slate-600">{edu.school}</p>
                <p className="text-[9px] text-slate-400 font-mono uppercase italic">
                  {edu.year}
                </p>
              </div>
            ))}
          </section>

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-3 pb-1 text-slate-900">
                Languages
              </h2>
              {data.languages.map((lang, i) => (
                <p key={i} className="text-[11px] text-slate-700 mb-1">
                  <span className="font-bold">{lang.name}</span>{" "}
                  <span className="text-slate-500 italic text-[10px]">
                    ({lang.proficiency})
                  </span>
                </p>
              ))}
            </section>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-slate-200 mb-3 pb-1 text-slate-900">
                Certifications
              </h2>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-3">
                  <p className="text-[11px] font-bold leading-tight text-slate-800">
                    {cert.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {cert.issuer}
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono">
                    {cert.date}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
