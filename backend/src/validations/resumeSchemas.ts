import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid id"),
});

export const resumeDataSchema = z
  .object({
    personal: z
      .object({
        fullName: z.string(),
        jobTitle: z.string(),
        email: z.string(),
        phone: z.string(),
        location: z.string(),
        summary: z.string(),
        image: z.string(),
        linkedin: z.string(),
        github: z.string(),
      })
      .partial(),
    experience: z
      .array(
        z.object({
          company: z.string(),
          position: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          description: z.string(),
        }).partial(),
      )
      .optional(),
    education: z
      .array(
        z.object({
          school: z.string(),
          degree: z.string(),
          year: z.string(),
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
          link: z.string(),
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
          link: z.string(),
          date: z.string(),
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