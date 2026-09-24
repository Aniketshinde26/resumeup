import { z } from "zod";
import { idParamSchema } from "./resumeSchemas";

export const coverLetterDataSchema = z
  .object({
    personal: z
      .object({
        fullName: z.string(),
        jobTitle: z.string(),
        email: z.string(),
        phone: z.string(),
        location: z.string(),
        image: z.string(),
        summary: z.string(),
      })
      .partial(),
    recipient: z
      .object({
        company: z.string(),
        hiringManager: z.string(),
        address: z.string(),
      })
      .partial(),
    letter: z
      .object({
        date: z.string(),
        subject: z.string(),
        salutation: z.string(),
        bodyParagraphs: z.array(z.string()),
        closing: z.string(),
      })
      .partial(),
  })
  .partial();

export const createCoverLetterSchema = z.object({
  Title: z.string().trim().min(1, "Title is required").max(200),
  TemplateId: z.string().trim().min(1, "TemplateId is required").max(100),
  Data: coverLetterDataSchema,
});

export const updateCoverLetterSchema = createCoverLetterSchema.partial();

export { idParamSchema };