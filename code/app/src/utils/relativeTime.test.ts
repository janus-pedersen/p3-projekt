import { describe, expect, it, vi } from "vitest";
import { relativeTime } from "./relativeTime";

describe("relativeTime", () => {
  // Uses fake timers so we can make the function deterministic.
  it("returns 'just now' for timestamps within ~2 seconds", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
    // Silence debug logs from the implementation during tests.
    vi.spyOn(console, "log").mockImplementation(() => {});

    expect(relativeTime(new Date("2025-01-01T00:00:00.500Z"), "en")).toBe(
      "just now"
    );

    vi.useRealTimers();
  });

  // Defensive behavior: invalid inputs should not throw.
  it("returns empty string for invalid dates", () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    expect(relativeTime(new Date(Number.NaN), "en")).toBe("");
  });
});
