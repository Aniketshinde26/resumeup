import type { ResumeData } from "../templates/templateindex";

export default function TechTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-template"
      className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans overflow-hidden box-border"
      style={{ margin: "0 auto" }}
    >
      {/* BOLD HEADER */}
      <header className="flex justify-between items-center mb-12 bg-slate-50 p-8 rounded-2xl">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="text-blue-600">
              {data.personal?.fullName?.split(" ")[1]}
            </span>
          </h1>
          <p className="text-xl font-medium text-slate-500 mt-1">
            {data.personal?.jobTitle}
          </p>
          <div className="flex gap-4 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span>{data.personal?.location}</span>
            <span>•</span>
            <span>{data.personal?.email}</span>
          </div>
        </div>
        {data.personal?.image && (
          <img
            src={data.personal.image}
            className="w-24 h-24 rounded-2xl rotate-3 shadow-lg object-cover"
            alt="Profile"
          />
        )}
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* MAIN SIDE */}
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4">
              Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200 pl-6">
              {data.experience?.map((exp, i) => (
                <div
                  key={i}
                  className="relative before:absolute before:left-[-27.5px] before:top-1.5 before:w-3 before:h-3 before:rounded-full before:bg-blue-600 before:border-4 before:border-white"
                >
                  <h3 className="font-bold text-slate-900 leading-none">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* DETAILS SIDE */}
        <div className="col-span-4 space-y-10">
          <section>
            <h2 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-col gap-2">
              {data.skills?.map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    {skill}
                  </span>
                  <div className="w-20 h-1 bg-slate-100 rounded-full">
                    <div className="w-full h-full bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl text-white">
            <h2 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">
              Education
            </h2>
            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <p className="text-sm font-bold">{edu.degree}</p>
                <p className="text-[10px] text-slate-400 mt-1">{edu.school}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
