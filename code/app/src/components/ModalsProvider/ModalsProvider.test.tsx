import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ModalsProvider } from "./ModalsProvider";
import { Keyboard } from "../../services/capacitor";
import { MantineProvider } from "@mantine/core";

describe("<ModalsProvider />", () => {
  // Verifies that the provider wires up Keyboard listeners on mount and
  // removes them on unmount (important to avoid leaking event handlers).
  it("registers and cleans up keyboard listeners", () => {
    const { unmount } = render(
      <MantineProvider>
        <ModalsProvider>
          <div>child</div>
        </ModalsProvider>
      </MantineProvider>
    );

    expect(vi.mocked(Keyboard.addListener)).toHaveBeenCalledWith(
      "keyboardWillShow",
      expect.any(Function)
    );
    expect(vi.mocked(Keyboard.addListener)).toHaveBeenCalledWith(
      "keyboardWillHide",
      expect.any(Function)
    );

    unmount();
    expect(vi.mocked(Keyboard.removeAllListeners)).toHaveBeenCalled();
  });
});
