import { z } from "zod";
import {
  requiredText,
  optionalText,
  emailField,
  urlOrEmpty,
  phoneField,
  lenientRow,
} from "./common";

const personalSchema = z.object({
  fullName: requiredText("Full Name", 100),
  jobTitle: requiredText("Job Title", 120),
  email: emailField,
  phone: phoneField,
  location: requiredText("Location", 150),
  summary: requiredText("Summary", 1000),
  linkedin: urlOrEmpty.optional(),
  github: urlOrEmpty.optional(),
  image: z.string().optional(),
});

const experienceRow = lenientRow(
  z.object({
    company: requiredText("Company", 100),
    position: requiredText("Position", 100),
    startDate: requiredText("Start Date", 40),
    endDate: requiredText("End Date", 40),
    description: requiredText("Description", 2000),
  }),
);

const educationRow = lenientRow(
  z.object({
    school: requiredText("School", 100),
    degree: requiredText("Degree", 100),
    year: requiredText("Graduation Year", 40),
  }),
);

const projectRow = lenientRow(
  z.object({
    name: requiredText("Project Name", 100),
    description: requiredText("Description", 2000),
    link: urlOrEmpty,
  }),
);

const languageRow = lenientRow(
  z.object({
    name: requiredText("Language", 80),
    proficiency: requiredText("Proficiency", 40),
  }),
);

const certificationRow = lenientRow(
  z.object({
    name: requiredText("Certification Name", 150),
    link: urlOrEmpty,
    date: requiredText("Date", 40),
  }),
);

const sectionTitlesSchema = z.object({
  skills: optionalText(60, "Skills header").optional(),
  projects: z
    .enum(["Projects", "Procedures", "Case Studies", "Publications"])
    .optional(),
  experience: optionalText(60, "Experience header").optional(),
  additionalSkills: optionalText(60, "Additional skills header").optional(),
});

export const resumeSchema = z.object({
  personal: personalSchema,
  experience: z.array(experienceRow),
  education: z.array(educationRow),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill"),
  projects: z.array(projectRow),
  languages: z.array(languageRow),
  certifications: z.array(certificationRow),
  sectionTitles: sectionTitlesSchema.optional(),
  additionalSkills: z.array(z.string()).optional(),
});

export type ResumeFormErrors = Record<string, string>;
