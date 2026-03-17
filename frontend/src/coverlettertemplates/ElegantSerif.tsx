import type { CoverLetterData } from "../types/templateindex";

export default function ElegantSerifTemplate({ data }: { data: CoverLetterData }) {
  return (
    <div id="cover-letter-template" className="w-full h-full bg-[#fff] p-[1.5in] font-serif">
      <div className="border-b-[1px] border-stone-200 pb-12 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl italic font-light text-stone-800 leading-none">
            {data.personal?.fullName}
          </h1>
        </div>
        <div className="text-right text-[11px] uppercase tracking-[0.2em] text-stone-400">
          <p>{data.personal?.location}</p>
          <p>{data.personal?.email}</p>
          <p>{data.personal?.jobTitle}</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-16 text-stone-500 text-sm italic">
          <p>{data.letter?.date}</p>
          <div className="mt-4 not-italic font-sans text-[12px] uppercase tracking-wider">
            <p className="text-stone-900 font-bold">{data.recipient?.hiringManager}</p>
            <p>{data.recipient?.company}</p>
          </div>
        </div>

        <div className="text-[16px] leading-[1.8] text-stone-800 space-y-8 antialiased">
          <p className="font-semibold">{data.letter?.salutation}</p>
          {data.letter?.bodyParagraphs?.map((p, i) => (
            <p key={i} className="first-letter:text-3xl first-letter:font-light">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-20">
          <p className="font-sans text-[12px] uppercase tracking-widest text-stone-400 mb-4">
            Sincerely,
          </p>
          <p className="text-2xl font-light italic text-stone-800 border-b w-fit border-stone-100">
            {data.personal?.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}