import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";

// Add your 10 templates here as you build them
export const TEMPLATES: Record<string, React.FC<any>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

// This helps the Dashboard show the list
export const TEMPLATE_LIST = [
  { id: "modern", name: "Modern Executive", preview: "bg-blue-600" },
  { id: "minimal", name: "Clean Minimalist", color: "bg-slate-400" },
];

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  image?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}
