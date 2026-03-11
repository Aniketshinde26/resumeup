import React from "react";
import ArchitectTemplate from "../resumetemplates/Architect";
import NeoProfessionalTemplate from "../resumetemplates/NeoPofessionalTemplate";
import CorporateTemplate from "../resumetemplates/MinimalistCorporate";
import MinimalTemplate from "../resumetemplates/MinimalTemplate";
import ModernTech from "../resumetemplates/ModernTech";
import ModernTemplate from "../resumetemplates/ModernTemplate";
import ProfessionalSplitCoverLetter from "../coverlettertemplates/Architecttype";
import ModernMinimalCoverLetter from "../coverlettertemplates/ModernMinimilistic";
export const TEMPLATES: Record<string, React.FC<any>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  minimalcorporate: CorporateTemplate,
  architect: ArchitectTemplate,
  neoprofessional: NeoProfessionalTemplate,
  moderntech: ModernTech, 
};

export const COVER_LETTER_TEMPLATES_MAP: Record<string, React.FC<any>> = {
  classic: ProfessionalSplitCoverLetter,
  moderncover: ModernMinimalCoverLetter,
};

export const TEMPLATE_LIST = [
  { id: "modern", name: "Modern Executive" },
  { id: "minimal", name: "Clean Minimalist" },
  { id: "minimalcorporate", name: "Minimalist Corporate" },
  { id: "architect", name: "Architect Style" },
  { id: "neoprofessional", name: "Neo Professional" },
  { id: "moderntech", name: "Modern Tech" },
];

export const COVER_LETTER_TEMPLATES = [
 { id: "classic", name: "Classic Cover Letter" },
  { id: "moderncover", name: "Modern Minimalist" },

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
export interface CoverLetter {
  Id: string;
  Title: string;
  TemplateId: string;
  Data: any; // You can create a CoverLetterData interface later
}

// Interface for the Resume object itself (as stored in DB)
export interface Resume {
  id: string;
  title: string;
  templateId: string;
  data: ResumeData;
}

export interface CoverLetterData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    image?: string;
  };
  recipient: {
    company: string;
    hiringManager?: string;
    address?: string;
  };
  letter: {
    date: string;
    subject?: string;
    salutation: string;
    bodyParagraphs: string[];
    closing: string;
  };
}
