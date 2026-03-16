import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../api/axios";

import { COVER_LETTER_TEMPLATES_MAP } from "../types/templateindex";


export default function CoverLetterPreview() {

  const { id } = useParams();

  const [coverLetter, setCoverLetter] = useState<any>(null);

  const [loading, setLoading] = useState(true);


    useEffect(() => {

    const fetchCoverLetter = async () => {

      try {

        const res = await api.get(`/coverletters/${id}`);

        setCoverLetter(res.data.coverLetter || res.data);

      } catch (err) {

        console.error("Failed to fetch cover letter for preview", err);

      } finally {

        setLoading(false);

      }   

    };

    fetchCoverLetter();

    }, [id]);


if (loading) return <div className="bg-white w-full h-full" />;  if (!coverLetter) return <div>Cover Letter not found</div>;


  let parsedData = {};

    try {

    parsedData =

      typeof coverLetter.data === "string"

        ? JSON.parse(coverLetter.data)

        : coverLetter.data;

  } catch (e) {

    console.error("Parse error", e);

  }


    const TemplateComponent = COVER_LETTER_TEMPLATES_MAP[coverLetter.templateId];


 return (
// Inside CoverLetterPreview.tsx return
<div className="bg-white w-[790px] h-[1118px] overflow-hidden preview-mode">
  <style>{`
    html, body { 
      margin: 0; 
      padding: 0; 
      background-color: white !important; /* Force white */
      width: 790px; 
      height: 1118px; 
      overflow: hidden;
    }
  `}</style>    
  {TemplateComponent ? (  
    <TemplateComponent data={parsedData} />
  ) : (
    <div className="flex items-center justify-center h-full text-slate-400 bg-white">
      Template Not Found: {coverLetter.templateId}
    </div>
  )}
</div>
);

}





