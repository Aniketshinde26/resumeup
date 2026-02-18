import { TEMPLATE_LIST } from "../types/templateindex";
import { useCoverLetterBuilder } from "../hooks/useCoverLetterDashboard";
import SkeletonWrapper from "../layouts/SkeletonWrapper";
import CreateItemModal from "../components/CreateItemModal"; // Use the generalized modal
import CoverLetterCard from "../components/CoverLetterCard"; // Ensure this component exists and is properly implemented

export default function CoverLetterDashboard() {
  const {
    coverLetters,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    handleEditCoverLetter,
    handleCoverTemplateSelect,
    handleCreateCoverLetter,
    handleDeleteCoverLetter,
  } = useCoverLetterBuilder();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 1. Template Selection Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-600 uppercase tracking-tight">
          Start New Cover Letter
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <SkeletonWrapper isLoading={isLoading} count={5}>
           {TEMPLATE_LIST.map((tpl) => (
  <div 
    key={tpl.id} 
    onClick={() => handleCoverTemplateSelect(tpl.id)} 
    className="group cursor-pointer"
  >
    {/* ADD 'relative' TO THIS CLASS LIST BELOW */}
    <div className="relative aspect-[1/1.41] rounded-xl border-2 border-slate-100 group-hover:border-blue-500 transition-all overflow-hidden bg-white shadow-sm">
      <img
        src={`/previews/${tpl.id}.png`}
        alt={tpl.name}
        className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
      />
      {/* Now this overlay will stay INSIDE the card boundary */}
      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
    </div>
    <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-blue-600 transition-colors">
      {tpl.name}
    </p>
  </div>
))}
          </SkeletonWrapper>
        </div>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* 2. Saved Cover Letters Section */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-slate-600 uppercase tracking-wider">
          Your Recent Letters
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonWrapper isLoading={isLoading} count={4}>
            {coverLetters.length > 0 ? (
              coverLetters.map((letter) => (
                <CoverLetterCard
                  key={letter.id}
                  title={letter.Title}
                  // Falls back to generic preview if templateId is missing
                  preview={`/previews/${letter.TemplateId || 'modern'}.png`}
                  onClick={() => handleEditCoverLetter(letter.id)}
                  onDelete={() => handleDeleteCoverLetter(letter.id)}
                />
              ))
            ) : (
              /* Empty State */
              !isLoading && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No cover letters yet</h3>
                  <p className="text-slate-500 mt-1">Select a template above to create your first letter.</p>
                </div>
              )
            )}
          </SkeletonWrapper>
        </div>
      </section>

      {/* 3. Creation Modal (Shared Component) */}
      <CreateItemModal
        type="Cover Letter"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCoverLetter}
        isLoading={isLoading}
      />
    </div>
  );
}