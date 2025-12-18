import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BatteryIndicator } from "./BatteryIndicator";

describe("<BatteryIndicator />", () => {
  it("renders battery-full for >= 75", () => {
    const { container } = render(<BatteryIndicator level={80} />);
    expect(container.querySelector(".lucide-battery-full")).toBeTruthy();
  });

  it("renders battery-warning for < 20", () => {
    const { container } = render(<BatteryIndicator level={10} />);
    expect(container.querySelector(".lucide-battery-warning")).toBeTruthy();
  });
});
