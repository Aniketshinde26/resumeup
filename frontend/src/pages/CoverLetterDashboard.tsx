import DocumentCard from "../components/DocumentCard";
import CreateItemModal from "../components/CreateItemModal";
import { useCoverLetterDashboard } from "../hooks/useCoverLetterDashboard";
import SkeletonWrapper from "../layouts/SkeletonWrapper";
import { COVER_LETTER_TEMPLATES } from "../types/templateindex";

export default function CoverLetterDashboard() {
    const {
       coverLetters,
        isLoading,
        handleEditCoverLetter,
        isModalOpen,
        handleTemplateSelect,
        handleCreateCoverLetter,
        handleDeleteCoverLetter,
        setIsModalOpen


    } = useCoverLetterDashboard();

  return (
    <div className="p-8" max-w-7xl mx-auto>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-600">START NEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonWrapper isLoading={false} count={2}>
              {COVER_LETTER_TEMPLATES.map((tpl) => (
            <div 
            key = {tpl.id}
            onClick={()=>handleTemplateSelect(tpl.id)}
            className="group cursor-pointer"
            >
                <div className="relative aspect-[1/1.41] rounded-xl border-2 border-slate-100 group-hover:border-blue-500 transition-all overflow-hidden bg-white shadow-sm">
                  <img
                    src={`/previews/${tpl.id}.png`}
                    alt={tpl.name}
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
                </div>
                <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-blue-600 transition-colors">{tpl.name}</p>

            </div>
              ))}
           </SkeletonWrapper>
         </div>
        </section>
              <hr className="my-10 border-slate-200" />

     
     <section>
        <h2 className="text-xl font-bold mb-6 text-slate-600 uppercase tracking-wider">
          Your Cover Letters
        </h2>
    

<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">       
   <SkeletonWrapper isLoading={isLoading} count={4}>
          {coverLetters.length > 0 ? (
            coverLetters.map((coverLetter: any) => (
              <DocumentCard
                key={coverLetter.Id}
                title={coverLetter.Title}
                updatedAt={coverLetter.updatedAt}
                id={coverLetter.Id}
                type="coverletter"
                preview={coverLetter.preview}
                showContent={false}
                onClick={() => handleEditCoverLetter(coverLetter.Id)}
                onDelete={() => handleDeleteCoverLetter(coverLetter.Id)}
              />
            ))
          ) : (
               !isLoading && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No coverletters yet</h3>
                  <p className="text-slate-500 mt-1">Select a template above to create your first cover letter.</p>
                </div>
              )          )}
        </SkeletonWrapper>
     </div>
           </section>


<CreateItemModal
    isOpen={isModalOpen}
    onClose={() => {setIsModalOpen(false)}}
    onCreate={handleCreateCoverLetter}
    isLoading={isLoading}
    type="Cover Letter"

  />
    </div>
  );
}