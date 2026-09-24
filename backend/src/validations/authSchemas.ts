import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(255);

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128);

export const registerSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, "Fullname must be at least 2 characters")
    .max(100),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(128),
});

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({ password: passwordSchema });

export const tokenParamSchema = z.object({ token: z.string().min(1) });

export const googleSchema = z
  .object({
    id_token: z.string().min(1).optional(),
    google_access_token: z.string().min(1).optional(),
  })
  .refine((d) => d.id_token || d.google_access_token, {
    message: "Provide id_token or google_access_token",
  });

export const githubSchema = z.object({ code: z.string().min(1, "Code is required") });