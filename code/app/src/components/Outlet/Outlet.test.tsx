import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Outlet } from "./Outlet";
import { RouteContext, type Route } from "../../contexts/Routes/RouteContext";

describe("<Outlet />", () => {
  // Renders whatever the current route points to in RouteContext.
  it("renders the component for the current route", () => {
    render(
      <RouteContext.Provider
        value={{
          routes: {
            wearer: {
              device: {
                label: "device",
                icon: null,
                component: <div>Device Page</div>,
              },
            },
            guardian: {},
          } as unknown as Record<"wearer" | "guardian", Record<string, Route>>,
          appMode: "wearer",
          setAppMode: () => {},
          currentRoute: "device",
          setCurrentRoute: () => {},
        }}
      >
        <Outlet />
      </RouteContext.Provider>
    );

    expect(screen.getByText("Device Page")).toBeInTheDocument();
  });

  // If the route doesn't exist, Outlet displays a small debug fallback.
  it("renders a fallback when route is missing", () => {
    render(
      <RouteContext.Provider
        value={{
          routes: {
            wearer: {},
            guardian: {},
          } as unknown as Record<"wearer" | "guardian", Record<string, Route>>,
          appMode: "wearer",
          setAppMode: () => {},
          currentRoute: "missing",
          setCurrentRoute: () => {},
        }}
      >
        <Outlet />
      </RouteContext.Provider>
    );

    expect(screen.getByText("wearer -missing")).toBeInTheDocument();
  });
});
