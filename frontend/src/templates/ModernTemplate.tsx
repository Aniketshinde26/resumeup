import type { ResumeData } from "../templates/templateindex";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-[210mm] h-[297mm] bg-white flex flex-col mx-auto shadow-sm overflow-hidden box-border font-sans">
      {/* DARK TOP HEADER */}
      <header className="bg-slate-900 text-white p-12 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="text-slate-400 font-light">
              {data.personal?.fullName?.split(" ")[1]}
            </span>
          </h1>
          <p className="text-slate-400 tracking-[0.3em] uppercase text-sm mt-2">
            {data.personal?.jobTitle}
          </p>
        </div>
        {data.personal?.image && (
          <img
            src={data.personal.image}
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
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN - SKILLS & EDUCATION */}
        <aside className="flex-1 bg-slate-50 p-10">
          <section className="mb-10">
            <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
              SUMMARY
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {data.personal?.summary}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
              EDUCATION
            </h2>
            {data.education?.map((edu, idx) => (
              <div key={idx} className="mb-4 text-xs">
                <p className="font-bold">{edu.school}</p>
                <p className="italic text-slate-500">{edu.degree}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-300">
              SKILLS
            </h2>
            <div className="space-y-2">
              {data.skills?.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-[10px] font-bold text-slate-700 bg-slate-200 px-3 py-1 inline-block mr-2 rounded-full"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
