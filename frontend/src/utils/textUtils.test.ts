import { describe, it, expect } from "vitest";
import { countWords, limitChars, limitWords } from "./textUtils";

describe("textUtils", () => {
  it("counts words", () => {
    expect(countWords("  hello   world ")).toBe(2);
    expect(countWords("   ")).toBe(0);
  });

  it("limits characters", () => {
    expect(limitChars("abcdef", 3)).toBe("abc");
  });
  it("limits words without leaving trailing spaces", () => {
    expect(limitWords("one two three", 3)).toBe("one two three");
  });

  it("limits words to the requested count", () => {
    expect(limitWords("one two three four", 2)).toBe("one two");
  });
});
