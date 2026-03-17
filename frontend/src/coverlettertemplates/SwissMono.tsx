import type { CoverLetterData } from "../types/templateindex";

export default function SwissMonoTemplate({ data }: { data: CoverLetterData }) {
  return (
    <div id="cover-letter-template" className="w-full h-full bg-[#fdfdfd] p-16 font-mono text-xs">
      {/* Updated Header Grid: 12 columns for better control */}
      <div className="grid grid-cols-12 gap-4 mb-20 border-b border-zinc-100 pb-10">
        <div className="col-span-7">
          <h1 className="text-3xl font-black uppercase mb-2 tracking-tighter">
            {data.personal?.fullName}
          </h1>
          <p className="text-zinc-500 tracking-widest">RESUME / COVER LETTER</p>
        </div>
        
        {/* Sender Info - Given more space (col-span-3) */}
        <div className="col-span-3 border-l border-zinc-200 pl-4">
          <p className="font-bold mb-2 text-zinc-400">SENDER</p>
          <div className="space-y-1 break-words">
            <p>{data.personal?.email}</p>
            <p>{data.personal?.phone}</p>
            <p className="uppercase text-[10px] text-zinc-500">{data.personal?.jobTitle}</p>
          </div>
        </div>

        {/* Date Info - col-span-2 */}
        <div className="col-span-2 border-l border-zinc-200 pl-4">
          <p className="font-bold mb-2 text-zinc-400">DATE</p>
          <p>{data.letter?.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <p className="font-bold uppercase mb-4 text-zinc-400">Recipient</p>
          <div className="space-y-1">
            <p className="font-bold text-zinc-900">{data.recipient?.hiringManager}</p>
            <p className="text-zinc-600">{data.recipient?.company}</p>
            <p className="mt-4 text-[10px] leading-relaxed text-zinc-400 whitespace-pre-line">
              {data.recipient?.address}
            </p>
          </div>
        </div>

        <div className="col-span-3 font-sans text-[15px] leading-[1.7] text-zinc-800 space-y-6 pr-10">
          <p className="font-bold text-lg mb-8 text-zinc-900">{data.letter?.salutation}</p>
          {data.letter?.bodyParagraphs?.map((p, i) => (
            <p key={i} className="text-justify">{p}</p>
          ))}
          
          <div className="mt-16 font-mono text-xs">
            <p className="mb-4 text-zinc-500 uppercase tracking-widest">{data.letter?.closing}</p>
            <p className="text-xl font-black uppercase text-zinc-900 leading-none">
              {data.personal?.fullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}