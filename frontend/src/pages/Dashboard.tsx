import { TEMPLATE_LIST } from "../templates/templateindex";
import ResumeCard from "../components/ResumeCard";
import CreateResumeModal from "../components/CreateResumeModal";
import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const {
    resumes,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    handleTemplateSelect,
    handleCreate,
  } = useDashboard();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Start New</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {TEMPLATE_LIST.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleTemplateSelect(tpl.id)}
              className="group cursor-pointer"
            >
              <div
                className={`aspect-3/4 rounded-xl ${
                  tpl.color || "bg-slate-200"
                } border-2 border-transparent group-hover:border-blue-500 transition-all flex items-center justify-center text-white font-bold`}
              >
                {tpl.name[0]}
              </div>
              <p className="mt-2 text-sm font-medium text-center">{tpl.name}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-10 border-slate-200" />

      <section>
        <h2 className="text-xl font-bold mb-6 text-slate-400 uppercase tracking-wider">
          Your Resumes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumes.map((resume: any) => (
            <ResumeCard
              key={resume.id}
              title={resume.title}
              updatedAt={resume.updatedAt}
              // We can still use navigate here if needed, or move to logic
              onClick={() => window.location.assign(`/builder/${resume.id}`)}
            />
          ))}
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
