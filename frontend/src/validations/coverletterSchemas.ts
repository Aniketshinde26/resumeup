import { z } from "zod";
import {
  dateField,
  emailField,
  optionalText,
  phoneField,
  requiredText,
} from "./common";

const personalSchema = z.object({
  fullName: requiredText("Full Name", 100),
  jobTitle: requiredText("Job Title", 120),
  email: emailField,
  phone: phoneField,
  location: requiredText("Location", 150),
  summary: optionalText(1000, "Summary").optional(),
  image: z.string().optional(),
});

const recipientSchema = z.object({
  company: requiredText("Company Name", 150),
  hiringManager: optionalText(100, "Hiring Manager").optional(),
  address: optionalText(300, "Company Address").optional(),
});

const letterSchema = z.object({
  date: dateField("Date"),
  subject: optionalText(200, "Subject Line").optional(),
  salutation: requiredText("Salutation", 100),
  bodyParagraphs: z
    .array(z.string())
    .refine(
      (paragraphs) => paragraphs.some((p) => p.trim().length > 0),
      "Body is required",
    ),
  closing: requiredText("Closing", 100),
});

export const coverLetterSchema = z.object({
  personal: personalSchema,
  recipient: recipientSchema,
  letter: letterSchema,
});

export type CoverLetterFormErrors = Record<string, string>;
