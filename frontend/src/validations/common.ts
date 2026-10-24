import { z } from "zod";
import type { ZodIssue } from "zod";

export const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} cannot exceed ${max} characters`);

export const optionalText = (max: number, label?: string) =>
  z
    .string()
    .trim()
    .max(max, label ? `${label} cannot exceed ${max} characters` : undefined);

export const emailField = z
  .string()
  .trim()
  .email("Invalid email address")
  .max(120, "Email cannot exceed 120 characters");

export const urlField = z
  .string()
  .trim()
  .url("Invalid URL")
  .max(500, "URL cannot exceed 500 characters");

export const urlOrEmpty = z.union([z.literal(""), urlField]);

const DATE_OR_YEAR_PATTERN =
  /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]+$/;

const isDateLike = (value: string): boolean =>
  /^(present|current)$/i.test(value) || DATE_OR_YEAR_PATTERN.test(value);

const isPhoneLike = (value: string): boolean =>
  PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 7;

export const phoneField = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Phone number cannot exceed 20 characters")
  .refine(isPhoneLike, "Enter a valid phone number");

export const dateField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(40, `${label} cannot exceed 40 characters`)
    .refine(
      isDateLike,
      `${label} must be a valid date (YYYY-MM-DD) or year (YYYY)`,
    );

export const isBlankRecord = (value: unknown): boolean => {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value as Record<string, unknown>).every(
    (v) => typeof v !== "string" || v.trim() === "",
  );
};

export const lenientRow = <T extends z.ZodObject>(schema: T) => {
  const blankShape: Record<string, z.ZodTypeAny> = {};
  for (const key of Object.keys(schema.shape)) {
    blankShape[key] = z.union([z.literal(""), z.undefined()]).optional();
  }
  const blankRow = z.object(blankShape);
  return z.union([blankRow, schema]) as unknown as z.ZodType<z.infer<T>>;
};

export type FieldErrorMap = Record<string, string>;

const joinpath = (path: readonly (string | number | symbol)[]): string =>
  path
    .map((segment, index) =>
      typeof segment === "number"
        ? `[${segment}]`
        : index === 0
          ? String(segment)
          : `.${String(segment)}`,
    )
    .join("");

export const collectIssues = (
  issues: readonly ZodIssue[],
  into: FieldErrorMap = {},
): FieldErrorMap => {
  for (const issue of issues) {
    const key = joinpath(issue.path ?? []);

    if (issue.code === "invalid_union") {
      const branches = issue.errors ?? [];
      const meaningful = branches[branches.length - 1];
      if (meaningful) collectIssues(meaningful, into);
      continue;
    }
    if (key && !into[key]) into[key] = issue.message;
    if (!key && !into._form) into._form = issue.message;
  }
  return into;
};
