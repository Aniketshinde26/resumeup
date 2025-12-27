// import type { ResumeData } from "../templates/templateindex";

// export default function MinimalTemplate({ data }: { data: ResumeData }) {
//   return (
//     // A4 Sheet Container
//     <div className="w-[210mm] h-[297mm] bg-white p-16 font-serif text-center mx-auto shadow-sm overflow-hidden box-border">
//       {/* Rest of your code remains the same... */} {/* HEADER */}
//       <header className="border-b-2 border-black pb-4 mb-8">
//         <h1 className="text-4xl tracking-widest uppercase font-light">
//           {data.personal?.fullName || "Your Name"}
//         </h1>
//         <p className="text-lg mt-2 italic text-slate-600">
//           {data.personal?.jobTitle || "Professional Title"}
//         </p>
//       </header>
//       {/* CONTACT INFO */}
//       <div className="flex justify-center gap-4 text-[10px] mb-10 text-slate-500 uppercase tracking-widest">
//         {data.personal?.email && <span>{data.personal.email}</span>}
//         {data.personal?.phone && (
//           <>
//             <span>•</span>
//             <span>{data.personal.phone}</span>
//           </>
//         )}
//         {data.personal?.location && (
//           <>
//             <span>•</span>
//             <span>{data.personal.location}</span>
//           </>
//         )}
//       </div>
//       {/* SUMMARY */}
//       {data.personal?.summary && (
//         <section className="text-left mb-10">
//           <p className="text-sm leading-relaxed text-slate-700 italic">
//             {data.personal.summary}
//           </p>
//         </section>
//       )}
//       {/* EXPERIENCE SECTION */}
//       <section className="text-left mb-10">
//         <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
//           Professional Experience
//         </h2>
//         <div className="space-y-8">
//           {data.experience?.map((exp, idx) => (
//             <div key={idx} className="group">
//               <div className="flex justify-between items-baseline mb-1">
//                 <h3 className="font-bold text-md uppercase">{exp.company}</h3>
//                 <span className="text-xs italic text-slate-500">
//                   {exp.startDate} — {exp.endDate}
//                 </span>
//               </div>
//               <p className="text-sm font-semibold text-slate-700 mb-2">
//                 {exp.position}
//               </p>
//               <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pl-4 border-l border-slate-200">
//                 {exp.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//       {/* EDUCATION SECTION */}
//       <section className="text-left mb-10">
//         <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
//           Education
//         </h2>
//         <div className="grid grid-cols-2 gap-6">
//           {data.education?.map((edu, idx) => (
//             <div key={idx}>
//               <h3 className="font-bold text-sm uppercase">{edu.school}</h3>
//               <p className="text-xs text-slate-600 italic">{edu.degree}</p>
//               <p className="text-[10px] text-slate-400 mt-1">{edu.year}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//       {/* SKILLS SECTION */}
//       <section className="text-left">
//         <h2 className="font-bold border-b border-black mb-4 text-sm tracking-[0.2em] uppercase">
//           Core Skills
//         </h2>
//         <div className="flex flex-wrap gap-x-6 gap-y-2">
//           {data.skills?.map((skill, idx) => (
//             <span
//               key={idx}
//               className="text-xs text-slate-700 uppercase tracking-tighter"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import type { ResumeData } from "../templates/templateindex";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    // A4 Sheet Container
    <div className="w-[210mm] h-[297mm] bg-white p-16 font-serif text-center mx-auto shadow-sm overflow-hidden box-border">
      {/* HEADER WITH OPTIONAL PHOTO */}
      <header className="border-b-2 border-black pb-4 mb-8">
        {data.personal?.image && (
          <div className="mb-4 flex justify-center">
            <img
              src={data.personal.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-black p-1"
            />
          </div>
        )}

        <h1 className="text-4xl tracking-widest uppercase font-light">
          {data.personal?.fullName || "Your Name"}
        </h1>
        <p className="text-lg mt-2 italic text-slate-600">
          {data.personal?.jobTitle || "Professional Title"}
        </p>
      </header>

      {/* CONTACT INFO */}
      <div className="flex justify-center gap-4 text-[10px] mb-10 text-slate-500 uppercase tracking-widest">
        {data.personal?.email && <span>{data.personal.email}</span>}
        {data.personal?.phone && (
          <>
            <span>•</span>
            <span>{data.personal.phone}</span>
          </>
        )}
        {data.personal?.location && (
          <>
            <span>•</span>
            <span>{data.personal.location}</span>
          </>
        )}
      </div>

      {/* SUMMARY */}
      {data.personal?.summary && (
        <section className="text-left mb-10">
          <p className="text-sm leading-relaxed text-slate-700 italic">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE SECTION */}
      <section className="text-left mb-10">
        <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {data.experience?.map((exp, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-md uppercase">{exp.company}</h3>
                <span className="text-xs italic text-slate-500">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                {exp.position}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pl-4 border-l border-slate-200">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="text-left mb-10">
        <h2 className="font-bold border-b border-black mb-6 text-sm tracking-[0.2em] uppercase">
          Education
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {data.education?.map((edu, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-sm uppercase">{edu.school}</h3>
              <p className="text-xs text-slate-600 italic">{edu.degree}</p>
              <p className="text-[10px] text-slate-400 mt-1">{edu.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="text-left">
        <h2 className="font-bold border-b border-black mb-4 text-sm tracking-[0.2em] uppercase">
          Core Skills
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {data.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs text-slate-700 uppercase tracking-tighter"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
