import type { CoverLetterData } from "../types/templateindex";

export default function ModernMinimalCoverLetter({
  data,
}: {
  data: CoverLetterData;
}) {
  return (
    <div
      id="cover-letter-template"
      className="w-full h-full bg-white p-[1.2in] font-sans text-neutral-700 flex flex-col"
    >
      <header className="text-center mb-16">
        {data.personal?.image && (
          <img
            src={data.personal.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-6 grayscale hover:grayscale-0 transition-all border-4 border-emerald-50 shadow-sm"
          />
        )}
        <h1 className="text-3xl font-light text-neutral-900 tracking-[0.15em] uppercase">
          {data.personal?.fullName}
        </h1>
        <div className="h-px w-16 bg-emerald-600 mx-auto mt-4 mb-2" />
        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-600">
          {data.personal?.jobTitle}
        </p>
      </header>

      <div className="flex justify-between items-start mb-12 text-[11px]">
        <div className="space-y-1">
          <p className="text-neutral-400 uppercase tracking-widest font-bold text-[9px]">To</p>
          {data.recipient?.hiringManager && (
            <p className="font-bold text-neutral-900 text-[12px]">{data.recipient.hiringManager}</p>
          )}
          <p className="text-emerald-700 font-medium">{data.recipient?.company}</p>
          {data.recipient?.address && (
            <p className="text-neutral-500 max-w-[250px] italic">
              {data.recipient.address}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-neutral-400 uppercase tracking-widest font-bold text-[9px] mb-1">Date</p>
          <p className="font-bold text-neutral-900">{data.letter?.date}</p>
        </div>
      </div>

      {data.letter?.subject && (
        <div className="mb-10 text-center">
          <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-[0.2em] bg-neutral-100 px-4 py-1.5 rounded-full">
            {data.letter.subject}
          </span>
        </div>
      )}

      <div className="flex-grow text-[13px] leading-[1.8] text-neutral-600 space-y-6 max-w-[90%] mx-auto">
        <p className="font-bold text-neutral-900 text-[14px]">{data.letter?.salutation}</p>
        
        {data.letter?.bodyParagraphs?.map((paragraph, i) => (
          <p key={i} className="indent-8 text-justify">{paragraph}</p>
        ))}

        <div className="pt-8">
          <p className="text-neutral-500 italic mb-2">{data.letter?.closing}</p>
          <p className="font-serif text-2xl text-neutral-900 lowercase italic">
            {data.personal?.fullName}
          </p>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-neutral-100 flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">E.</span> {data.personal?.email}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">P.</span> {data.personal?.phone}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">L.</span> {data.personal?.location}
        </div>
      </footer>
    </div>
  );
}