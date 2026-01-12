import ArchitectTemplate from "./Architect";
import CorporateTemplate from "./MinimalistCorporate";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";

// Add your 10 templates here as you build them
export const TEMPLATES: Record<string, React.FC<any>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  minimalcorporate: CorporateTemplate,
  architect: ArchitectTemplate,
};

export const TEMPLATE_LIST = [
  { id: "modern", name: "Modern Executive" },
  { id: "minimal", name: "Clean Minimalist" },
  { id: "minimalcorporate", name: "Minimalist Corporate" },
  { id: "architect", name: "Architect Style" },
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
  projects?: { name: string; description: string; link?: string }[];
  languages?: { name: string; proficiency: string }[];
  certifications?: { name: string; issuer: string; date: string }[];
}
