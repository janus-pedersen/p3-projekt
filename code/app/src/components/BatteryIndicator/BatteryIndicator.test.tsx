import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BatteryIndicator } from "./BatteryIndicator";

describe("<BatteryIndicator />", () => {
  // lucide-react renders an SVG with a predictable className (lucide-<icon-name>).
  it("renders battery-full for >= 75", () => {
    const { container } = render(<BatteryIndicator level={80} />);
    expect(container.querySelector(".lucide-battery-full")).toBeTruthy();
  });

  // Lowest battery icon is used for the warning threshold (< 20%).
  it("renders battery-warning for < 20", () => {
    const { container } = render(<BatteryIndicator level={10} />);
    expect(container.querySelector(".lucide-battery-warning")).toBeTruthy();
  });
});
