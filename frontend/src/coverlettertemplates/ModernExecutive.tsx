import type { CoverLetterData } from "../types/templateindex";

export default function ModernExecutiveTemplate({ data }: { data: CoverLetterData }) {
  return (
    <div id="cover-letter-template" className="w-full h-full bg-white flex font-sans text-slate-900">
      <div className="w-1/3 bg-slate-50 p-12 flex flex-col justify-between border-r border-slate-100">
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">{data.personal?.fullName}</h1>
          <div className="h-1 w-12 bg-blue-600 mb-8" />
          
          <div className="space-y-6 text-sm text-slate-500">
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-tighter text-xs mb-1">Contact</p>
              <p>{data.personal?.email}</p>
              <p>{data.personal?.phone}</p>
              <p>{data.personal?.location}</p>
              <p>{data.personal?.jobTitle}</p>
            </div>
          </div>
        </div>

       
      </div>

      <div className="w-2/3 p-16">
        <div className="mb-12">
          <p className="text-slate-400 mb-8">{data.letter?.date}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 font-mono">To:</p>
          <p className="text-lg font-semibold">{data.recipient?.hiringManager}</p>
          <p className="text-slate-500 italic">{data.recipient?.company}</p>
        </div>

        <div className="space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p className="font-bold text-slate-900">{data.letter?.salutation}</p>
          {data.letter?.bodyParagraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-slate-500 mb-2">{data.letter?.closing}</p>
          <p className="text-xl font-bold">{data.personal?.fullName}</p>
        </div>
      </div>
    </div>
  );
}