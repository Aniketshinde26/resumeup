
import { Link } from "react-router-dom";
import { FileText, PenTool, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SelectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'selectionpage' });

  const tools = [
    {
      id: "resume-manager", 
      title: <p style={{color:'var(--color-text-main)'}}>{t('resume_manager')}</p>,
      desc: t("create_and_edit_your_professional_resumes"),
      path: "/my-resumes",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-600"
    },
    {
      id: "cover-letter",
      title: <p style={{color:'var(--color-text-main)'}}>{t('cover_letter')}</p>,
      desc: t("generate_custom_letters_for_specific_jobs"),
      path: "/cover-letter",
      icon: <PenTool className="w-6 h-6" />,
      color: "bg-purple-600"
    },
    {
      id: "ats-scorer",
      title: <p style={{color:'var(--color-text-main)'}}>{t('ats_scorer')}</p>,
      desc: t("analyze_your_resume_against_job_descriptions"),
      path: "/ats-check",
      icon: <Search className="w-6 h-6" />,
      color: "bg-emerald-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
        <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--color-text-main)' }}>
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-green-600">ResumePro</span>
        </h1>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl">
          {t('everything_you_need_to_land_your_dream_job_powered_by_smart_design_select_a_tool_below_to_begin')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.id} className="group">
            {/* Added bg-white here */}
            <div className="h-full  border-slate-200 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 flex flex-col items-start">
              <div className={`p-4 rounded-2xl ${tool.color} text-white mb-6 shadow-lg shadow-current/20`}>
                {tool.icon}
              </div>
              {/* Removed the <p> tag from the title object and styled it here directly */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {tool.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {tool.desc}
              </p>
              <span className="mt-auto font-bold text-emerald-600 text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Open Tool →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}