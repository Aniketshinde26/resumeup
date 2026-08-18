import type { ResumeData } from "../types/templateindex";

export default function Modern({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white font-sans text-slate-800 flex flex-col overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      <header className="bg-[#1a1f2c] text-white p-[12mm] flex justify-between items-center shrink-0">
        <div className="space-y-1">
          <h1 className="text-4xl font-light tracking-tight">
            <span className="font-bold">
              {(data.personal?.fullName || '').split(' ')[0]}
            </span>{' '}
            {(data.personal?.fullName || '').split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
            {data.personal?.jobTitle}
          </p>
        </div>
        {data.personal?.image && (
          <div className="w-24 h-24 border-2 border-slate-700 p-1">
            <img
              src={data.personal.image}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
        )}
      </header>

      <div className="flex flex-1">
        <main className="flex-[1.6] p-[12mm] pr-6 flex flex-col gap-10">
          
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1.5 w-10 bg-slate-900 rounded-full" />
              <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">
                {data.sectionTitles?.experience || "Experience"}
              </h2>
            </div>
            
            <div className="space-y-8 border-l-[1.5px] border-slate-100 ml-2">
              {data.experience?.map((exp, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-400 bg-white" />
                  
                  <div className="mb-2">
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide">
                      {exp.position}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase">
                      {exp.company} | {exp.startDate} — {exp.endDate}
                    </p>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {data.projects && data.projects.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1.5 w-10 bg-slate-900 rounded-full" />
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">
                  {data.sectionTitles?.projects || "Projects"}
                </h2>
              </div>
              <div className="space-y-6 border-l-[1.5px] border-slate-100 ml-2">
                {data.projects.map((proj, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-400 bg-white" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wide">
                        {proj.name}
                      </h3>
                      {proj.link && (
                        <span className="text-[10px] italic">
                          {proj.link.startsWith('http') ? (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 font-bold not-italic">View Link</a>
                          ) : (
                            <span className="text-slate-400">{proj.link}</span>
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="flex-1 bg-white p-[12mm] pl-6 border-l border-slate-100 flex flex-col gap-8">
          
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-[11px] text-slate-500">
              {data.personal?.email && <p className="flex items-center gap-2">✉ {data.personal.email}</p>}
              {data.personal?.phone && <p className="flex items-center gap-2">📞 {data.personal.phone}</p>}
              {data.personal?.location && <p className="flex items-center gap-2">📍 {data.personal.location}</p>}
            </div>
          </section>

          {data.personal?.summary && (
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Summary
              </h2>
              <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-line">
                {data.personal.summary}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {data.education?.map((edu, i) => (
                <div key={i}>
                  <p className="text-[11px] font-black text-slate-800 uppercase leading-tight">
                    {edu.school}
                  </p>
                  <p className="text-[10px] text-slate-500 italic">{edu.degree}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-tighter">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
              {data.sectionTitles?.skills || "Skills"}
            </h2>
            <div className="flex flex-col gap-2">
              {data.skills?.map((skill, i) => (
                <div 
                  key={i} 
                  className="bg-[#2c3547] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md text-center shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-800 uppercase">
                      {lang.name}
                    </p>
                    <p className="text-[9px] text-slate-500 italic">
                      {lang.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">{cert.name}</p>
                    <p className="text-[9px] text-slate-400">{cert.date}</p>
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