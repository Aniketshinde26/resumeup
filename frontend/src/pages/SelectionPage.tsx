import { Link } from "react-router-dom";
import { FileText, PenTool, Search } from "lucide-react"; // Or use your own SVGs

export default function SelectionPage() {
  const tools = [
    {
      title: "Resume Manager",
      desc: "Create and edit your professional resumes.",
      path: "/my-resumes",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-600"
    },
    {
      title: "AI Cover Letter",
      desc: "Generate custom letters for specific jobs.",
      path: "/cover-letter",
      icon: <PenTool className="w-6 h-6" />,
      color: "bg-purple-600"
    },
    {
      title: "ATS Scorer",
      desc: "Analyze your resume against job descriptions.",
      path: "/ats-check",
      icon: <Search className="w-6 h-6" />,
      color: "bg-emerald-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Welcome to ResumeUp</h1>
        <p className="text-slate-500 mt-2">Select a tool to get started with your career journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.title} className="group">
            <div className="h-full bg-white border border-slate-200 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 flex flex-col items-start">
              <div className={`p-4 rounded-2xl ${tool.color} text-white mb-6 shadow-lg shadow-current/20`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{tool.desc}</p>
              <span className="mt-auto font-bold text-brand-primary text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Open Tool →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}