// components/TemplateTeaser.tsx
import { PUBLIC_TEMPLATES } from "../constants/templates";
import { useNavigate } from "react-router-dom";

export default function TemplateTeaser() {
  const navigate = useNavigate();

  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Choose a template to get started</h2>
      <div className="flex justify-center gap-8">
        {PUBLIC_TEMPLATES.map((tpl) => (
          <div 
            key={tpl.id} 
            className="group cursor-pointer max-w-[250px]"
            onClick={() => navigate(`/builder/${tpl.id}`)} // Sends them straight to the editor
          >
            <div className="aspect-[1/1.41] rounded-xl border-2 border-slate-200 group-hover:border-blue-500 transition-all overflow-hidden shadow-md">
              <img src={`/previews/${tpl.id}.png`} alt={tpl.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-center font-semibold text-slate-700">{tpl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}