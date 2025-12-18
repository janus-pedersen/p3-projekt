import { describe, expect, it } from "vitest";

describe("module smoke tests", () => {
  it("imports all non-test src modules", async () => {
    const modules = import.meta.glob("../**/*.{ts,tsx}");

    const moduleEntries = Object.entries(modules).filter(([path]) => {
      if (path.includes("/test/")) return false;
      if (path.includes(".test.")) return false;
      return true;
    });

    expect(moduleEntries.length).toBeGreaterThan(0);

    for (const [, importer] of moduleEntries) {
      await importer();
    }
  });
});

