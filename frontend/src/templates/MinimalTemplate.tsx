export default function MinimalTemplate({ data }: any) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-16 font-serif text-center">
      <header className="border-b-2 border-black pb-4 mb-8">
        <h1 className="text-4xl tracking-widest uppercase">
          {data.personal?.fullName || "Name"}
        </h1>
        <p className="text-lg mt-2 italic text-slate-600">
          {data.personal?.jobTitle}
        </p>
      </header>

      <div className="flex justify-center gap-4 text-xs mb-10 text-slate-500 uppercase">
        <span>{data.personal?.email}</span>
        <span>•</span>
        <span>{data.personal?.phone}</span>
      </div>

      <section className="text-left">
        <h2 className="font-bold border-b mb-4">PROFESSIONAL EXPERIENCE</h2>
        {/* Experience mapping... */}
      </section>
    </div>
  );
}
