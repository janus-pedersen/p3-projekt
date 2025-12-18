import { describe, expect, it, vi } from "vitest";
import { relativeTime } from "./relativeTime";

describe("relativeTime", () => {
  it("returns 'just now' for timestamps within ~2 seconds", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
    vi.spyOn(console, "log").mockImplementation(() => {});

    expect(relativeTime(new Date("2025-01-01T00:00:00.500Z"), "en")).toBe(
      "just now"
    );

    vi.useRealTimers();
  });

  it("returns empty string for invalid dates", () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    expect(relativeTime(new Date(Number.NaN), "en")).toBe("");
  });
});
