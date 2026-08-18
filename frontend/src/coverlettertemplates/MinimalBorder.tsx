import type { CoverLetterData } from "../types/templateindex";

export default function MinimalistBorderTemplate({ data }: { data: CoverLetterData }) {
  return (
    <div id="cover-letter-template" className="w-full h-full bg-white p-[1in] font-serif text-zinc-800 border-[12px] border-zinc-50">
      <header className="text-center mb-16">
        <h1 className="text-3xl tracking-[0.2em] uppercase font-light text-zinc-900 mb-2">
          {data.personal?.fullName}
        </h1>
        <div className="flex justify-center gap-4 text-[10px] text-zinc-400 uppercase tracking-widest">
          <span>{data.personal?.email}</span>
          <span>•</span>
          <span>{data.personal?.phone}</span>
          <span>•</span>
          <span>{data.personal?.jobTitle}</span>
          {data.personal?.location && (
            <>
              <span>•</span>
              <span>{data.personal.location}</span>
            </>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto text-[13px] leading-relaxed">
        <p className="mb-8 text-zinc-400">{data.letter?.date}</p>
        
        <div className="mb-10 space-y-1">
          <p className="font-bold text-zinc-900">{data.recipient?.hiringManager}</p>
          <p className="text-zinc-500 font-medium">{data.recipient?.company}</p>
          {data.recipient?.address && (
            <p className="text-zinc-400 whitespace-pre-line leading-snug">
              {data.recipient.address}
            </p>
          )}
        </div>

        <div className="space-y-6 text-zinc-700 italic">
          <p className="font-bold not-italic text-zinc-900">{data.letter?.salutation}</p>
          {data.letter?.bodyParagraphs?.map((p, i) => (
            <p key={i} className="text-justify">{p}</p>
          ))}
        </div>

        <div className="mt-12">
          <p className="mb-4 text-zinc-600">{data.letter?.closing}</p>
          <p className="font-bold text-lg text-zinc-900 leading-none">
            {data.personal?.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}