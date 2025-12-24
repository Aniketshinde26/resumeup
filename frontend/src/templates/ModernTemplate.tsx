export default function ModernTemplate({ data }: any) {
  return (
    <div className="p-8 bg-white shadow-inner min-h-[297mm] flex gap-8 font-sans">
      {/* Sidebar */}
      <div className="w-1/3 border-r pr-6 border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 break-words">
          {data.personal?.fullName || "Aniket"}
        </h1>
        <p className="text-brand-primary font-medium mt-1">
          {data.personal?.jobTitle}
        </p>

        <div className="mt-8 space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-slate-400 uppercase text-xs">
              Contact
            </h4>
            <p className="text-slate-600">{data.personal?.email}</p>
            <p className="text-slate-600">{data.personal?.phone}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <section>
          <h2 className="text-lg font-bold text-slate-700 border-b-2 border-slate-800 mb-4">
            Experience
          </h2>
          {data.experience?.map((exp: any, i: number) => (
            <div key={i} className="mb-4">
              <h3 className="font-bold">{exp.position}</h3>
              <p className="text-sm text-slate-500">{exp.company}</p>
              <p className="text-xs mt-1 text-slate-600">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
