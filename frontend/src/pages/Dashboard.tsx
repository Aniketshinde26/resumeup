import { TEMPLATE_LIST, type Resume } from "../types/templateindex";
import DocumentCard from "../components/DocumentCard";
import CreateItemModal from "../components/CreateItemModal";
import { useDashboard } from "../hooks/useDashboard";
import SkeletonWrapper from "../layouts/SkeletonWrapper";
import { useTranslation } from "react-i18next";
import GridBackground from "../layouts/Gridbackground"; 

export default function Dashboard() {
  const {t} = useTranslation('translation',{keyPrefix:'dashboard'});
  const {
    resumes,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    handleTemplateSelect,
    handleCreate,
    handleEditResume,
    handleDeleteResume,
   
    
  } = useDashboard();

  return (
    <>
    <div className="-m-8">
    <GridBackground>
    <div className="p-8 max-w-7xl mx-auto w-full">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-(--color-text)">
          {t('start_new')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SkeletonWrapper isLoading={false} count={2}>
            {TEMPLATE_LIST.map((tpl) => (
              <div 
                key={tpl.id} 
                onClick={() => handleTemplateSelect(tpl.id)} 
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
        <h2 className="text-xl font-bold mb-6 text-(--color-text) uppercase tracking-wider">
         {t('your_resumes')}
        </h2>

     
        
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">         
   <SkeletonWrapper isLoading={false} count={4}>
            {resumes.length > 0 ? (
              resumes.map((resume: Resume) => (
                <DocumentCard
                  key={resume.id}
                  title={resume.title}
                  updatedAt={resume.updatedAt}
                  id={resume.id}
                  type="resume"
                  showContent={true}
                  preview={`/previews/${resume.templateId}.png`}
                  onClick={() => handleEditResume(resume.id)}
                  onDelete={() => handleDeleteResume(resume.id)}
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
                  <h3 className="text-lg font-medium text-slate-900">{t('no_resumes_yet')}</h3>
                  <p className="text-slate-500 mt-1">{t('select_a_template_above_to_create_your_first_resume')}</p>
                </div>
              )
            )}
          </SkeletonWrapper>
        </div>
      </section>
    </div>
    </GridBackground>
    </div>
<CreateItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        isLoading={isLoading}
        type="Resume"
      />


    </>
  );
}