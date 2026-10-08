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

export const phoneField = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Phone number cannot exceed 20 characters");

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
