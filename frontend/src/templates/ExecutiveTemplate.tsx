import type { ResumeData } from "../templates/templateindex";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white font-sans text-slate-800 flex overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      {/* LEFT COLUMN - SIDEBAR */}
      <aside className="w-[70mm] bg-slate-900 text-white p-[15mm] flex flex-col gap-8">
        <div className="text-center">
          {data.personal?.image && (
            <img
              src={data.personal.image}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700 object-cover"
              alt="Profile"
            />
          )}
          <h1 className="text-2xl font-bold leading-tight uppercase tracking-wide">
            {data.personal?.fullName}
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {data.personal?.jobTitle}
          </p>
        </div>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-700 pb-2 mb-4">
            Contact
          </h2>
          <div className="space-y-3 text-[11px] text-slate-300">
            <p className="flex flex-col">
              <span>Email:</span>{" "}
              <span className="text-white">{data.personal?.email}</span>
            </p>
            <p className="flex flex-col">
              <span>Phone:</span>{" "}
              <span className="text-white">{data.personal?.phone}</span>
            </p>
            <p className="flex flex-col">
              <span>Location:</span>{" "}
              <span className="text-white">{data.personal?.location}</span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-700 pb-2 mb-4">
            Core Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-800 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </aside>

      {/* RIGHT COLUMN - MAIN CONTENT */}
      <main className="flex-1 p-[15mm] bg-white">
        {data.personal?.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 mb-4 pb-1">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {data.personal.summary}
            </p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 mb-4 pb-1">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience?.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-600 mb-2">
                  {exp.company}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 mb-4 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education?.map((edu, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-slate-900">
                  {edu.school}
                </h3>
                <p className="text-xs text-slate-600">
                  {edu.degree} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
