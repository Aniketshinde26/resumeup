import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { TEMPLATES } from "../types/templateindex"; 

export default function ResumePreview() {
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resumes/${id}`);
        setResume(res.data.resume || res.data);
      } catch (err) {
        console.error("Failed to fetch resume for preview", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

if (loading) return <div className="bg-white w-full h-full" />;  if (!resume) return <div>Resume not found</div>;

  let parsedData = {};
  try {
    parsedData =
      typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data;
  } catch (e) {
    console.error("Parse error", e);
  }

  const TemplateComponent = TEMPLATES[resume.templateId];

  return (
  
    <div className="bg-white w-[790px] h-[1118px] overflow-hidden preview-mode">
  <style>{`
    body { margin: 0; padding: 0; overflow: hidden; width: 790px; height: 1118px; }
    /* Ensure the template component doesn't add huge padding */
    .preview-mode > div { padding: 0 !important; margin: 0 !important; }
  `}</style>

      {TemplateComponent ? (
        <TemplateComponent data={parsedData} />
      ) : (
        <div className="p-10 text-center">
          <p>Template "{resume.templateId}" not 
            found.</p>
        </div>
      )}
    </div>
  );
}


