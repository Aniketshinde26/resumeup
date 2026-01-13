import type { ResumeData } from "../templates/templateindex";

export default function CorporateTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] h-[297mm] bg-white flex shadow-sm font-sans text-slate-800 box-border overflow-hidden"
    >
      {/* LEFT SIDEBAR (1/3 of the page) */}
      <aside className="w-[75mm] bg-slate-900 text-white p-8 flex flex-col shrink-0">
        {/* PHOTO */}
        {data.personal?.image && (
          <div className="mb-8 flex justify-center">
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-xl"
            />
          </div>
        )}

        <div className="space-y-8">
          {/* CONTACT */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
              Contact
            </h2>
            <div className="space-y-3 text-[11px] text-slate-300">
              {data.personal?.location && (
                <p className="flex items-center gap-2">
                  📍 {data.personal.location}
                </p>
              )}
              {data.personal?.email && (
                <p className="flex items-center gap-2 break-all">
                  ✉️ {data.personal.email}
                </p>
              )}
              {data.personal?.phone && (
                <p className="flex items-center gap-2">
                  📞 {data.personal.phone}
                </p>
              )}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-800 text-slate-200 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-1">
              Education
            </h2>
            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4">
                <p className="text-[11px] font-bold text-white">{edu.degree}</p>
                <p className="text-[10px] text-slate-400">{edu.school}</p>
                <p className="text-[9px] text-slate-500 mt-1">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </aside>

      {/* MAIN CONTENT (2/3 of the page) */}
      <main className="flex-1 p-10 flex flex-col">
        {/* NAME & TITLE */}
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="text-blue-600">
              {" "}
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl font-medium text-slate-500 mt-1 tracking-wide">
            {data.personal?.jobTitle}
          </p>
        </header>

        {/* SUMMARY */}
        {data.personal?.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-3">
              About Me <span className="h-[2px] bg-slate-100 flex-1"></span>
            </h2>
            <p className="text-[12px] text-slate-600 leading-relaxed italic">
              {data.personal.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        <section className="flex-1">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
            Experience <span className="h-[2px] bg-slate-100 flex-1"></span>
          </h2>
          <div className="space-y-6">
            {data.experience?.map((exp, i) => (
              <div
                key={i}
                className="relative pl-6 border-l-2 border-slate-100"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-blue-600 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-slate-900">
                    {exp.position}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-blue-600 mb-2">
                  {exp.company}
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-3">
              Projects <span className="h-[2px] bg-slate-100 flex-1"></span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-100"
                >
                  <h3 className="font-bold text-[12px] text-slate-900 mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
