import React, { useContext } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RoutesProvider } from "./RoutesProvider";
import { RouteContext } from "./RouteContext";

const routes = {
  wearer: {
    device: { label: "device", icon: null, component: <div>Wearer Device</div> },
    profile: {
      label: "profile",
      icon: null,
      component: <div>Wearer Profile</div>,
    },
  },
  guardian: {
    alerts: {
      label: "alerts",
      icon: null,
      component: <div>Guardian Alerts</div>,
    },
    map: { label: "map", icon: null, component: <div>Guardian Map</div> },
  },
} as const;

function TestUI() {
  const ctx = useContext(RouteContext)!;
  const active = (ctx.routes as any)[ctx.appMode]?.[ctx.currentRoute as any];
  return (
    <>
      <div data-testid="mode">{ctx.appMode}</div>
      <div data-testid="route">{String(ctx.currentRoute)}</div>

      <button onClick={() => ctx.setAppMode("wearer")}>wearer</button>
      <button onClick={() => ctx.setAppMode("guardian")}>guardian</button>
      <button onClick={() => ctx.setCurrentRoute("profile" as any)}>
        wearer-profile
      </button>
      <button onClick={() => ctx.setCurrentRoute("map" as any)}>
        guardian-map
      </button>

      <div>{active?.component}</div>
    </>
  );
}

describe("<RoutesProvider />", () => {
  it("defaults to the first route per mode and remembers per-mode route", async () => {
    localStorage.clear();
    const user = userEvent.setup();

    render(
      <RoutesProvider routes={routes}>
        <TestUI />
      </RoutesProvider>
    );

    expect(screen.getByTestId("mode")).toHaveTextContent("wearer");
    expect(screen.getByText("Wearer Device")).toBeInTheDocument();

    await user.click(screen.getByText("wearer-profile"));
    expect(screen.getByText("Wearer Profile")).toBeInTheDocument();

    await user.click(screen.getByText("guardian"));
    expect(screen.getByText("Guardian Alerts")).toBeInTheDocument();

    await user.click(screen.getByText("guardian-map"));
    expect(screen.getByText("Guardian Map")).toBeInTheDocument();

    await user.click(screen.getByText("wearer"));
    expect(screen.getByText("Wearer Profile")).toBeInTheDocument();
  });
});
