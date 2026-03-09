import type { CoverLetterData } from "../types/templateindex";

export default function ProfessionalSplitCoverLetter({
  data,
}: {
  data: CoverLetterData;
}) {
  return (
    <div
      id="cover-letter-template"
      className="w-full h-full bg-white flex font-sans text-slate-800"
    >
      {/* LEFT COLUMN - Primary Content (The Letter) */}
      <main className="flex-[1.6] p-12 pr-8 bg-white flex flex-col">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {data.personal?.fullName?.split(" ")[0]}
            <span className="block text-indigo-600 leading-none">
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-slate-400 mt-4">
            {data.personal?.jobTitle}
          </p>
        </header>

        {/* Date & Recipient Info */}
        <section className="mb-10 text-[11px] text-slate-600 font-medium">
          <p className="mb-6 font-bold text-slate-800">{data.letter?.date}</p>
          
          <div className="space-y-1">
            {data.recipient?.hiringManager && (
              <p className="font-bold text-slate-900 text-[12px]">
                {data.recipient.hiringManager}
              </p>
            )}
            <p className="font-bold text-indigo-600 uppercase italic">
              {data.recipient?.company}
            </p>
            {data.recipient?.address && (
              <p className="whitespace-pre-line text-slate-500">
                {data.recipient.address}
              </p>
            )}
          </div>
        </section>

        {/* The Letter Body */}
        <section className="flex-grow">
          {data.letter?.subject && (
            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-indigo-600"></span> 
              {data.letter.subject}
            </h2>
          )}

          <div className="text-[12px] text-slate-600 leading-relaxed text-justify space-y-4">
            <p className="font-bold text-slate-800">
              {data.letter?.salutation}
            </p>
            
            {data.letter?.bodyParagraphs?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Sign-off */}
          <div className="mt-10 text-[12px]">
            <p className="text-slate-600 mb-4">{data.letter?.closing}</p>
            <p className="font-bold text-slate-900 text-[14px] uppercase tracking-tight">
              {data.personal?.fullName}
            </p>
          </div>
        </section>
      </main>

      {/* RIGHT COLUMN - Sidebar (Mirrors the Resume Sidebar) */}
      <aside className="flex-1 bg-slate-50 border-l border-slate-100 p-10 flex flex-col gap-10">
        {data.personal?.image && (
          <img
            src={data.personal.image}
            alt="Profile"
            className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg mx-auto"
          />
        )}

        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Contact Details
          </h2>
          <div className="space-y-3 text-[11px] text-slate-600 font-medium">
            <p className="flex items-center gap-2">
              ✉️ <span className="break-all">{data.personal?.email}</span>
            </p>
            <p className="flex items-center gap-2">📞 {data.personal?.phone}</p>
            <p className="flex items-center gap-2">
              📍 {data.personal?.location}
            </p>
          </div>
        </section>

        {/* Optional: Add a brief "Why Me" or "Key Highlights" section in the sidebar to fill the space creatively */}
        <section className="mt-auto">
          <div className="p-4 bg-white border-l-2 border-indigo-600 rounded-r-lg shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Enclosure
            </p>
            <p className="text-[11px] text-slate-600 font-medium">
              Please find my attached resume for a comprehensive overview of my technical experience and projects.
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}