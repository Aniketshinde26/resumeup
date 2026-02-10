import type { ResumeData } from "../templates/templateindex";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white p-[20mm] font-serif text-center overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      {/* HEADER */}
      <header className="border-b-2 border-black pb-4 mb-8">
        {data.personal?.image && (
          <div className="mb-4 flex justify-center">
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-black p-1"
            />
          </div>
        )}
        <h1 className="text-4xl tracking-widest uppercase font-light">
          {data.personal?.fullName || "Your Name"}
        </h1>
        <p className="text-lg mt-2 italic text-slate-600">
          {data.personal?.jobTitle || "Professional Title"}
        </p>
      </header>

      {/* CONTACT INFO */}
      <div className="flex justify-center gap-4 text-[10px] mb-10 text-slate-500 uppercase tracking-widest">
        {data.personal?.email && <span>{data.personal.email}</span>}
        {data.personal?.phone && (
          <>
            <span>•</span>
            <span>{data.personal.phone}</span>
          </>
        )}
        {data.personal?.location && (
          <>
            <span>•</span>
            <span>{data.personal.location}</span>
          </>
        )}
      </div>

      {/* SUMMARY */}
      {data.personal?.summary && (
        <section className="text-left mb-10">
          <p className="text-sm leading-relaxed text-slate-700 italic">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE SECTION */}
      {data.experience && data.experience.length > 0 && (
        <section className="text-left mb-10">
          <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-md uppercase">{exp.company}</h3>
                  <span className="text-xs italic text-slate-500">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  {exp.position}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pl-4 border-l border-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DYNAMIC PROJECTS / RESEARCH SECTION */}
      {data.projects && data.projects.length > 0 && (
        <section className="text-left mb-10">
          <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
            {data.sectionTitles?.projects || "Key Projects"}
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm uppercase">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-[10px] text-slate-500 tracking-normal italic">
                      {proj.link.startsWith('http') ? (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          link
                        </a>
                      ) : (
                        proj.link
                      )}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}
      {data.education && data.education.length > 0 && (
        <section className="text-left mb-10">
          <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
            Education
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-sm uppercase">{edu.school}</h3>
                <p className="text-xs text-slate-600 italic">{edu.degree}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="text-left mb-10">
          <h2 className="font-bold border-b border-black mb-4 text-sm tracking-[0.2em] uppercase">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-y-2 gap-x-6">
            {data.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-xs text-slate-700"
              >
                <span className="font-semibold uppercase tracking-tight">{cert.name}</span>
                <span className="text-[10px] text-slate-400">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LANGUAGES & SKILLS SIDE-BY-SIDE */}
      <div className="grid grid-cols-2 gap-10">
        {/* DYNAMIC SKILLS */}
        <section className="text-left">
          <h2 className="font-bold border-b border-black mb-4 text-sm tracking-[0.2em] uppercase">
            {data.sectionTitles?.skills || "Core Skills"}
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {data.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs text-slate-700 uppercase tracking-tighter"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <section className="text-left">
            <h2 className="font-bold border-b border-black mb-4 text-sm tracking-[0.2em] uppercase">
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang, idx) => (
                <p key={idx} className="text-xs text-slate-700 uppercase">
                  {lang.name}{" "}
                  <span className="text-[10px] text-slate-400 font-serif italic lowercase">
                    ({lang.proficiency})
                  </span>
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}