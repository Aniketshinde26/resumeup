import ArchitectTemplate from "./Architect";
import NeoProfessionalTemplate from "./NeoPofessionalTemplate";
import CorporateTemplate from "./MinimalistCorporate";
import MinimalTemplate from "./MinimalTemplate";
import ModernTech from "./ModernTech";
import ModernTemplate from "./ModernTemplate";

// Add your 10 templates here as you build them
export const TEMPLATES: Record<string, React.FC<any>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  minimalcorporate: CorporateTemplate,
  architect: ArchitectTemplate,
  neoprofessional: NeoProfessionalTemplate,
  moderntech: ModernTech, // Placeholder for Modern Tech template
};

export const TEMPLATE_LIST = [
  { id: "modern", name: "Modern Executive" },
  { id: "minimal", name: "Clean Minimalist" },
  { id: "minimalcorporate", name: "Minimalist Corporate" },
  { id: "architect", name: "Architect Style" },
  { id: "neoprofessional", name: "Neo Professional" },
  { id: "moderntech", name: "Modern Tech" },
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
  sectionTitles?: {
    skills: string;
    projects: string;
    experience?: string;
    additionalSkills: string;
  };
  skills: string[];
  additionalSkills?: string[];
projects?: { 
    name: string; 
    description: string; 
    link?: string;
    type?: 'project' | 'procedure' | 'case_study'; 
  }[];
    languages?: { name: string; proficiency: string }[];
  certifications?: { name: string; issuer: string; date: string }[];
}
