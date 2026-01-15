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

  // Parse the stringified 'data' field
  let parsedData = {};
  try {
    parsedData =
      typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data;
  } catch (e) {
    console.error("Parse error", e);
  }

  // LOOKUP: Get the component from the Record using the templateId (e.g., 'modern')
  const TemplateComponent = TEMPLATES[resume.templateId];

  return (
    <div className="bg-white min-h-screen">
      {TemplateComponent ? (
        <TemplateComponent data={parsedData} />
      ) : (
        <div className="p-10 text-center">
          <p>Template "{resume.templateId}" not found in TEMPLATES record.</p>
        </div>
      )}
    </div>
  );
}
