import { z } from "zod";

const DATE_OR_YEAR_PATTERN =
  /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]+$/;

const isDateLike = (value: string): boolean =>
  /^(present|current)$/i.test(value) || DATE_OR_YEAR_PATTERN.test(value);

const isPhoneLike = (value: string): boolean =>
  PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 7;

export const emailField = z.union([
  z.literal(""),
  z.string().trim().email("Enter a valid email address").max(255),
]);

export const phoneField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number cannot exceed 20 characters")
    .refine(isPhoneLike, "Enter a valid phone number"),
]);

export const urlField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .url("Enter a valid URL")
    .max(500, "URL cannot exceed 500 characters"),
]);

export const dateField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(40, "Date cannot exceed 40 characters")
    .refine(
      isDateLike,
      "Enter a valid date (YYYY-MM-DD) or year (YYYY)",
    ),
]);
