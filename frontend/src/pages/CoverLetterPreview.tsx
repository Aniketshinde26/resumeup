import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {COVER_LETTER_TEMPLATES_MAP } from "../types/templateindex";

export default function CoverLetterPreview() {
  const { id } = useParams();
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const res = await api.get(`/cover-letters/${id}`);
        setCoverLetter(res.data.coverletter || res.data);
      } catch (err) {
        console.error("Failed to fetch cover letter for preview", err);
      } finally {
        setLoading(false);
      } 
    };
    fetchCoverLetter();
  }, [id]);

  if (loading) return <div className="bg-white w-full h-full" />;
  if (!coverLetter) return <div>Cover Letter not found</div>;  
  
  const templateId = coverLetter.TemplateId || coverLetter.templateId;
  const rawData = coverLetter.Data || coverLetter.data;

  let parsedData = {};
  try {
    parsedData = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
  } catch (e) {
    console.error("Parse error", e);
    parsedData = rawData;
  }
  const TemplateComponent = COVER_LETTER_TEMPLATES_MAP[templateId];

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
          <p>Template "{templateId}" not found.</p>
        </div>  
      )}
    </div>
  );
}