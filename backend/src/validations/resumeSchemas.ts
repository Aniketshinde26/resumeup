import { z } from "zod";
import { dateField, emailField, phoneField, urlField } from "./fields";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid id"),
});

export const resumeDataSchema = z
  .object({
    personal: z
      .object({
        fullName: z.string(),
        jobTitle: z.string(),
        email: emailField,
        phone: phoneField,
        location: z.string(),
        summary: z.string(),
        image: z.string(),
        linkedin: urlField,
        github: urlField,
      })
      .partial(),
    experience: z
      .array(
        z.object({
          company: z.string(),
          position: z.string(),
          startDate: dateField,
          endDate: dateField,
          description: z
            .string()
            .max(250, "Description cannot exceed 250 characters"),
        }).partial(),
      )
      .optional(),
    education: z
      .array(
        z.object({
          school: z.string(),
          degree: z.string(),
          year: dateField,
        }).partial(),
      )
      .optional(),
    sectionTitles: z
      .object({
        skills: z.string(),
        projects: z.string(),
        experience: z.string(),
        additionalSkills: z.string(),
      })
      .partial(),
    skills: z.array(z.string()).optional(),
    additionalSkills: z.array(z.string()).optional(),
    projects: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          link: urlField,
          type: z.string(),
        }).partial(),
      )
      .optional(),
    languages: z
      .array(
        z.object({
          name: z.string(),
          proficiency: z.string(),
        }).partial(),
      )
      .optional(),
    certifications: z
      .array(
        z.object({
          name: z.string(),
          link: urlField,
          date: dateField,
        }).partial(),
      )
      .optional(),
  })
  .partial();

export const createResumeSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  templateId: z.string().trim().min(1, "templateId is required").max(100),
  data: resumeDataSchema,
});

export const updateResumeSchema = createResumeSchema.partial();