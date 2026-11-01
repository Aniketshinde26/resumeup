import { describe, it, expect } from "vitest";
import { countWords, limitChars } from "./textUtils";

describe("textUtils", () => {
  it("counts words", () => {
    expect(countWords("  hello   world ")).toBe(2);
    expect(countWords("   ")).toBe(0);
  });

  it("limits characters", () => {
    expect(limitChars("abcdef", 3)).toBe("abc");
  });
});
