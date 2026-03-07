import { useCoverLetterDashboard } from "../hooks/useCoverLetterDashboard";

export default function CoverLetterDashboard() {
    const {
       
        handleTemplateSelect
    } = useCoverLetterDashboard();

  return (
    <div className="p-8" max-w-7xl mx-auto>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-600">START NEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
            onClick={()=>handleTemplateSelect}
            className="group cursor-pointer"
            >

            </div>
           
         </div>
        </section>
     
    </div>
  );
}