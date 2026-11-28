import { describe, expect, it } from "vitest";
import { dateField, phoneField } from "./common";

describe("validation fields", () => {
  it("accepts a valid phone number", () => {
    expect(phoneField.safeParse("+1 (555) 123-4567").success).toBe(true);
  });
  it("rejects a phone number with too few digits", () => {
    expect(phoneField.safeParse("12345").success).toBe(false);
  });
  it("accepts valid date formats", () => {
    const date = dateField("Date");

    expect(date.safeParse("2024-01").success).toBe(true);
    expect(date.safeParse("present").success).toBe(true);
  });
  it("rejects an invalid date string", () => {
    expect(dateField("Date").safeParse("not-a-date").success).toBe(false);
  });
  it("rejects an impossible calendar date", () => {
    expect(dateField("Date").safeParse("2024-02-30").success).toBe(false);
  });
  it("accepts a real calendar date", () => {
    expect(dateField("Date").safeParse("2024-02-21").success).toBe(true);
  });

  it("accepts leap day in a leap year", () => {
    expect(dateField("Date").safeParse("2024-02-29").success).toBe(true);
  });

  it("rejects leap day in a non-leap year", () => {
    expect(dateField("Date").safeParse("2023-02-29").success).toBe(false);
  });
});
