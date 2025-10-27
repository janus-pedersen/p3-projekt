import { createContext, useContext } from "react";

export type AppMode = "wearer" | "guardian";

export interface Route {
  //   name: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode | ((active: boolean) => React.ReactNode);
}

// New helper: a map of route key -> Route
export type RouteMap = Record<string, Route>;

// RouteContext now models routes grouped by AppMode (RMap).
// currentRoute and setCurrentRoute use a union of keys across all modes.
export type RouteContextType<
  RMap extends Record<AppMode, RouteMap> = Record<AppMode, RouteMap>
> = {
  routes: RMap;
  appMode: AppMode;
  setAppMode(mode: AppMode): void;
  // union of route keys across all modes:
  currentRoute: { [K in keyof RMap]: keyof RMap[K] }[keyof RMap];
  setCurrentRoute(
    route: { [K in keyof RMap]: keyof RMap[K] }[keyof RMap]
  ): void;
};

export const RouteContext = createContext<
  RouteContextType<Record<AppMode, Record<string, Route>>> | undefined
>(undefined);

