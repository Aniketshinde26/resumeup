import { Optional } from "sequelize";

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
    skills?: string;
    projects?: string;
    experience?: string;
    additionalSkills?: string;
  };
  skills: string[];
  additionalSkills?: string[];
  projects?: {
    name: string;
    description: string;
    link?: string;
    type?: "project" | "procedure" | "case_study";
  }[];
  languages?: { name: string; proficiency: string }[];
  certifications?: { name: string; issuer: string; date: string }[];
}

export interface ResumeAttributes {
  id: number;
  userId: number;
  title: string;
  templateId: string;
  data: ResumeData;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResumeCreationAttributes extends Optional<
  ResumeAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export type Resume = ResumeAttributes;
