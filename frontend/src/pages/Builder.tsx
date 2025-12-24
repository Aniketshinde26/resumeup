import { useState } from "react";
import { useParams } from "react-router-dom";
import { TEMPLATES } from "../templates/templateindex";

export default function Builder() {
  const { id: _id } = useParams();
  const [resumeData, setResumeData] = useState({
    templateId: "modern", // This will come from your API/DB
    personal: { fullName: "Aniket", email: "", phone: "", jobTitle: "" },
    experience: [],
  });

  // Dynamic Component Selection
  const SelectedTemplate =
    TEMPLATES[resumeData.templateId] || TEMPLATES["modern"];

  return (
    <div className="flex h-screen">
      {/* LEFT: FORM */}
      <div className="w-1/2 overflow-y-auto p-10 bg-white">
        <h2 className="text-2xl font-bold mb-6">Edit Resume</h2>
        <input
          className="w-full p-2 border rounded"
          placeholder="Full Name"
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, fullName: e.target.value },
            })
          }
        />
        {/* Add more inputs here */}
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="flex-1 bg-slate-200 p-12 overflow-y-auto flex justify-center">
        {/* The container below ensures the "A4" paper stays visible */}
        <div
          className="shadow-2xl bg-white origin-top"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          <div className="bg-yellow-100 p-2 text-xs">
            Debug Name: {resumeData.personal.fullName}
          </div>
          {/* Logic check: Is the template actually there? */}
          {SelectedTemplate ? (
            <SelectedTemplate data={resumeData} />
          ) : (
            <div className="p-10 text-red-500">
              Template not found! Check your registry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
