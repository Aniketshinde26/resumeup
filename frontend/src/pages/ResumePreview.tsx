import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { TEMPLATES } from "../templates/templateindex"; // Import the Record

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

  if (loading) return null;
  if (!resume) return <div>Resume not found</div>;

  let parsedData = {};
  try {
    parsedData =
      typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data;
  } catch (e) {
    console.error("Parse error", e);
  }

  const TemplateComponent = TEMPLATES[resume.templateId];

  return (
    /* CHANGE: Removed min-h-screen and added overflow-hidden.
       Added 'preview-mode' class in case you want to target CSS specifically for the card.
    */
    <div className="bg-white w-full h-full overflow-hidden preview-mode">
      <style>{`
        /* Force remove any scrollbars or body padding when viewed in iframe */
        body { margin: 0; padding: 0; overflow: hidden; }
      `}</style>

      {TemplateComponent ? (
        <TemplateComponent data={parsedData} />
      ) : (
        <div className="p-10 text-center">
          <p>Template "{resume.templateId}" not found.</p>
        </div>
      )}
    </div>
  );
}
