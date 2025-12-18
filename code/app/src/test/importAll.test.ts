import { describe, expect, it } from "vitest";

describe("module smoke tests", () => {
  // This is a safety net: it ensures every production module can be imported
  // under the test mocks (Capacitor/Firebase/Maps/etc), catching missing mocks
  // and accidental side effects at import time.
  it("imports all non-test src modules", async () => {
    const modules = import.meta.glob("../**/*.{ts,tsx}");

    const moduleEntries = Object.entries(modules).filter(([path]) => {
      if (path.includes("/test/")) return false;
      if (path.includes(".test.")) return false;
      return true;
    });

    // If this is 0, the glob/filter is wrong and the test is meaningless.
    expect(moduleEntries.length).toBeGreaterThan(0);

    // Import each module; failures here usually mean a missing/mock or a
    // module that performs browser/native work on import.
    for (const [, importer] of moduleEntries) {
      await importer();
    }
  });
});
