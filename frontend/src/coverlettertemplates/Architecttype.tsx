import type { CoverLetterData } from "../types/templateindex";

export default function ProfessionalSplitCoverLetter({
  data,
}: {
  data: CoverLetterData;
}) {
  return (
    <div
      id="cover-letter-template"
      className="w-full h-full bg-white p-[1.5in] font-sans text-slate-800 leading-relaxed"
    >
      <header className="mb-12 border-b-2 border-slate-100 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {data.personal?.fullName?.split(" ")[0]}{" "}
            <span className="text-indigo-600">
              {data.personal?.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mt-2">
            {data.personal?.jobTitle}
          </p>
        </div>

        {data.personal?.image && (
          <img
            src={data.personal.image}
            alt="Profile"
            className="w-20 h-20 rounded-xl object-cover border-2 border-slate-100 shadow-sm"
          />
        )}
      </header>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium text-slate-500 mb-12 uppercase tracking-wide">
        <span>✉️ {data.personal?.email}</span>
        <span>📞 {data.personal?.phone}</span>
        <span>📍 {data.personal?.location}</span>
      </div>

      <div className="mb-10 text-[12px]">
        <p className="font-bold text-slate-900 mb-6">{data.letter?.date}</p>
        
        <div className="space-y-0.5">
          {data.recipient?.hiringManager && (
            <p className="font-bold text-slate-900">{data.recipient.hiringManager}</p>
          )}
          <p className="font-bold text-indigo-600 uppercase italic">
            {data.recipient?.company}
          </p>
          {data.recipient?.address && (
            <p className="text-slate-500 whitespace-pre-line">
              {data.recipient.address}
            </p>
          )}
        </div>
      </div>

      {data.letter?.subject && (
        <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-wider mb-8 border-l-4 border-indigo-600 pl-3">
          RE: {data.letter.subject}
        </h2>
      )}

      <div className="text-[13px] text-slate-600 space-y-5">
        <p className="font-bold text-slate-800">{data.letter?.salutation}</p>
        
        {data.letter?.bodyParagraphs?.map((paragraph, i) => (
          <p key={i} className="text-justify">{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 text-[13px]">
        <p className="text-slate-600 mb-6">{data.letter?.closing}</p>
        <p className="font-bold text-slate-900 text-[15px] uppercase tracking-tight">
          {data.personal?.fullName}
        </p>
      </div>
    </div>
  );
}