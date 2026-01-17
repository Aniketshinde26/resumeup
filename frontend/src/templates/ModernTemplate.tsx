import type { ResumeData } from "../templates/templateindex";

export default function MidnightGoldTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white font-sans text-slate-800 flex overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      {/* LEFT COLUMN - ACCENT SIDEBAR */}
      <aside className="w-[75mm] bg-[#1a1c23] text-white p-[12mm] flex flex-col gap-8 shrink-0">
        <div className="relative">
          {data.personal?.image && (
            <div className="relative z-10 w-32 h-32 mx-auto mb-6">
              <img
                src={data.personal.image}
                className="w-full h-full rounded-2xl object-cover border-2 border-amber-400/30"
                alt="Profile"
              />
              <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-amber-400/20 rounded-2xl -z-10" />
            </div>
          )}
          <h1 className="text-2xl font-black leading-tight uppercase tracking-tighter text-amber-400">
            {data.personal?.fullName}
          </h1>
          <div className="h-1 w-12 bg-amber-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-3">
            {data.personal?.jobTitle}
          </p>
        </div>

        {/* CONTACT SECTION */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60 mb-5">
            Communication
          </h2>
          <div className="space-y-4 text-[11px]">
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-bold uppercase">Email</span>
              <span className="text-slate-200 truncate">
                {data.personal?.email}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-bold uppercase">Phone</span>
              <span className="text-slate-200">{data.personal?.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-bold uppercase">
                Location
              </span>
              <span className="text-slate-200">{data.personal?.location}</span>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60 mb-5">
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, i) => (
              <span
                key={i}
                className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* LANGUAGES SECTION */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60 mb-5 text-justify">
              Languages
            </h2>
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[10px]"
                >
                  <span className="font-bold text-slate-200 uppercase tracking-wide">
                    {lang.name}
                  </span>
                  <span className="text-amber-400/70 italic text-[9px] lowercase">
                    ({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS SECTION */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60 mb-5">
              Certifications
            </h2>
            <div className="space-y-4">
              {data.certifications.map((cert, i) => (
                <div key={i} className="border-l border-amber-400/20 pl-3">
                  <p className="text-[10px] font-bold text-slate-200 uppercase leading-tight">
                    {cert.name}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-1">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* RIGHT COLUMN - MAIN CONTENT */}
      <main className="flex-1 p-[15mm] bg-[#fcfcfc] flex flex-col gap-10 overflow-hidden">
        {data.personal?.summary && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-3">
              Professional Profile <div className="h-px flex-1 bg-slate-200" />
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 italic font-serif">
              "{data.personal.summary}"
            </p>
          </section>
        )}

        {/* EXPERIENCE SECTION */}
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
            Career History <div className="h-px flex-1 bg-slate-200" />
          </h2>
          <div className="space-y-8">
            {data.experience?.map((exp, i) => (
              <div
                key={i}
                className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-full before:bg-amber-400/20"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.position}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  {exp.company}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
              Key Projects <div className="h-px flex-1 bg-slate-200" />
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-sm uppercase italic">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <span className="text-[10px] text-amber-600 font-medium hover:underline">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION SECTION */}
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
            Academic Background <div className="h-px flex-1 bg-slate-200" />
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.education?.map((edu, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:border-amber-400/20 transition-colors"
              >
                <h3 className="text-xs font-black text-slate-900 uppercase mb-1">
                  {edu.school}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium italic">
                  {edu.degree}
                </p>
                <p className="text-[10px] text-amber-600 font-bold mt-2">
                  {edu.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
