import { TEMPLATE_LIST } from "../templates/templateindex";
import ResumeCard from "../components/ResumeCard";
import CreateResumeModal from "../components/CreateResumeModal";
import { useDashboard } from "../hooks/useDashboard";
import SkeletonWrapper from "../layouts/SkeletonWrapper";
export default function Dashboard() {
  const {
    resumes,
    isModalOpen,
    setIsModalOpen,
   isLoading,
    handleTemplateSelect,
    handleCreate,
    handleEditReume,
    handleDeleteResume,
  } = useDashboard();



  return (
    <div className="p-8 max-w-7xl mx-auto">
     <section className="mb-12">
  <h2 className="text-2xl font-bold mb-6 text-slate-800">Start New</h2>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
    {/* Use the Wrapper here instead of the manual ? : check */}
    <SkeletonWrapper isLoading={isLoading} count={5}>
      {TEMPLATE_LIST.map((tpl) => (
        <div 
          key={tpl.id} 
          onClick={() => handleTemplateSelect(tpl.id)} 
          className="group cursor-pointer"
        >
          <div className="aspect-[1/1.41] rounded-xl border-2 border-slate-100 group-hover:border-blue-500 transition-all overflow-hidden bg-white shadow-sm">
            <img
              src={`/previews/${tpl.id}.png`}
              alt={tpl.name}
              className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-center text-slate-700">{tpl.name}</p>
        </div>
      ))}
    </SkeletonWrapper>
  </div>
</section>

      <hr className="my-10 border-slate-200" />

      <section>
        <h2 className="text-xl font-bold mb-6 text-slate-800 uppercase tracking-wider">
          Your Resumes
        </h2>
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">  

      <SkeletonWrapper isLoading={isLoading} count={4}>
          {resumes.map((resume: any) => (
            <ResumeCard
              key={resume.id}
              title={resume.title}
              updatedAt={resume.updatedAt}
              resumeData={resume}
              showContent={true}
              preview={`/previews/${resume.templateId}.png`}
              onClick={() => handleEditReume(resume.id)}
              onDelete={() => handleDeleteResume(resume.id)}
            />
          ))}
         </SkeletonWrapper>
        </div>
      </section>

      <CreateResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        isLoading={isLoading}
      />
    </div>
  );
}
