import type { ResumeData } from "../types/templateindex";
import { formatSocialUrl } from "../utils/formatUrl";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white p-[12mm] font-serif text-center text-slate-800 overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      <header className="border-b-2 border-black pb-2 mb-4">
        {data.personal?.image && (
          <div className="mb-2 flex justify-center">
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border border-black p-1"
            />
          </div>
        )}
        <h1 className="text-5xl tracking-widest uppercase font-light">
          {data.personal?.fullName || " Your Name"}
        </h1>
        <p className="text-xl mt-1 italic text-slate-700">
          {data.personal?.jobTitle || "Professional Title"}
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs mb-5 text-slate-600 uppercase tracking-widest">
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
        {data.personal?.linkedin && (
          <>
            <span>•</span>
            <span className="normal-case tracking-normal">{formatSocialUrl(data.personal.linkedin)}</span>
          </>
        )}
        {data.personal?.github && (
          <>
            <span>•</span>
            <span className="normal-case tracking-normal">{formatSocialUrl(data.personal.github)}</span>
          </>
        )}
      </div>

      {data.personal?.summary && (
        <section className="text-left mb-4">
          <p className="text-base leading-snug text-slate-700 italic">
            {data.personal.summary}
          </p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="text-left mb-4">
          <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-lg uppercase">{exp.company}</h3>
                  <span className="text-sm italic text-slate-600">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-base font-semibold text-slate-700 mb-1">
                  {exp.position}
                </p>
                <p className="text-sm text-slate-700 leading-snug whitespace-pre-line pl-3 border-l border-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="text-left mb-4">
          <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
            {data.sectionTitles?.projects || "Key Projects"}
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-base uppercase">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-[11px] text-slate-600 tracking-normal italic">
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
                <p className="text-sm text-slate-700 leading-snug whitespace-pre-line">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="text-left mb-4">
          <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
            Education
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-base uppercase">{edu.school}</h3>
                  <p className="text-sm text-slate-700 italic">{edu.degree}</p>
                  <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-widest">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section className="text-left mb-4">
          <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="mb-1 last:mb-0">
                <div className="flex justify-between items-center text-sm text-slate-700">
                  <span className="font-semibold uppercase tracking-tight">{cert.name}</span>
                  <span className="text-xs text-slate-500">{cert.date}</span>
                </div>
                {cert.link && (
                  <p className="text-[11px] text-blue-600 break-all leading-snug mt-0.5">
                    {cert.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        <section className="text-left">
          <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
            {data.sectionTitles?.skills || "Core Skills"}
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {data.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="text-sm text-slate-700 uppercase tracking-tighter"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {data.languages && data.languages.length > 0 && (
          <section className="text-left">
            <h2 className="font-bold border-b border-black mb-2 text-base tracking-[0.2em] uppercase">
              Languages
            </h2>
            <div className="space-y-0.5">
              {data.languages.map((lang, idx) => (
                <p key={idx} className="text-sm text-slate-700 uppercase">
                  {lang.name}{" "}
                    <span className="text-xs text-slate-500 font-serif italic lowercase">
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
