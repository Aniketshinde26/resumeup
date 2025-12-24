import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ResumeCard from "../components/ResumeCard";
import CreateResumeModal from "../components/CreateResumeModal";
// 1. Import your template list
import { TEMPLATE_LIST } from "../templates/templateindex";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  // ... fetchResumes logic ...

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId); // Store the template ID
    setIsModalOpen(true); // Open the name modal
  };

  const handleCreate = async (title: string) => {
    try {
      // 2. Send the templateId to the backend
      const res = await api.post("/api/resumes", {
        title,
        templateId: selectedTemplate,
      });
      navigate(`/builder/${res.data.id || res.data._id}`);
    } catch (err) {
      console.error("Creation failed", err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* SECTION: TEMPLATE CHOICES */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Start New</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {TEMPLATE_LIST.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleTemplateSelect(tpl.id)}
              className="group cursor-pointer"
            >
              {/* This represents the template preview */}
              <div
                className={`aspect-[3/4] rounded-xl ${
                  tpl.color || "bg-slate-200"
                } border-2 border-transparent group-hover:border-brand-primary group-hover:shadow-lg transition-all flex items-center justify-center text-white font-bold`}
              >
                {tpl.name[0]} {/* Placeholder for thumbnail */}
              </div>
              <p className="mt-2 text-sm font-medium text-center">{tpl.name}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* SECTION: RECENT RESUMES */}
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
              onClick={() => navigate(`/builder/${resume.id}`)}
            />
          ))}
        </div>
      </section>

      <CreateResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}
