import type { CoverLetterData } from "../types/templateindex";

export default function ElegantSerifTemplate({ data }: { data: CoverLetterData }) {
  return (
    <div id="cover-letter-template" className="w-full h-full bg-[#fff] p-12 font-serif flex flex-col">
      <div className="border-b-[1px] border-stone-200 pb-8 mb-8 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-4xl italic font-light text-stone-800 leading-none">
            {data.personal?.fullName}
          </h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-stone-500 mt-2">
            {data.personal?.jobTitle}
          </p>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.15em] text-stone-400">
          <p>{data.personal?.location}</p>
          <p>{data.personal?.email}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex-1">
        <div className="mb-8 text-stone-500 text-sm italic">
          <p>{data.letter?.date}</p>
          <div className="mt-4 not-italic font-sans text-[11px] uppercase tracking-wider">
            <p className="text-stone-900 font-bold">{data.recipient?.hiringManager}</p>
            <p className="text-stone-500">{data.recipient?.company}</p>
          </div>
        </div>

        <div className="text-[14px] leading-[1.6] text-stone-800 space-y-5 antialiased">
          <p className="font-semibold text-stone-900">{data.letter?.salutation}</p>
          {data.letter?.bodyParagraphs?.map((p, i) => (
            <p key={i} className="text-justify first-letter:text-2xl first-letter:font-light first-letter:mr-1">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 pb-4">
          <p className="font-sans text-[11px] uppercase tracking-widest text-stone-400 mb-2">
            {data.letter?.closing || "Sincerely,"}
          </p>
          <p className="text-2xl font-light italic text-stone-800 border-b w-fit border-stone-100">
            {data.personal?.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}