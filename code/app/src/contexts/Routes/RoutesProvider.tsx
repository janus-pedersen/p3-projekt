import React from "react";
import { RouteContext, type Route, type AppMode, type RouteContextType } from "./RouteContext";
import { useLocalStorage } from "@mantine/hooks";

export function RoutesProvider<
  RMap extends Record<AppMode, Record<string, Route>>
>(
  props: React.PropsWithChildren<{
    routes: RMap;
  }>
) {
  // pick a sensible default mode (first key) if present
  const defaultMode = (Object.keys(props.routes)[0] ?? "wearer") as AppMode;

  const [appMode, setAppMode] = useLocalStorage<AppMode>({
    key: "appMode",
    defaultValue: defaultMode,
  });

  // namespace currentRoute by mode so each mode can remember its last route
  const routeKey = `currentRoute_${appMode}`;
  const defaultRouteForMode =
    Object.keys(props.routes[appMode] ?? props.routes[defaultMode])[0] ?? "";
  const [currentRoute, setCurrentRouteState] = useLocalStorage<string>({
    key: routeKey,
    defaultValue: defaultRouteForMode,
  });

  // lightweight wrapper to satisfy the context signature (runtime values are strings)
  const setCurrentRoute = (route: keyof RMap[keyof RMap]) => {
    setCurrentRouteState(route as string);
  };

  return (
    <RouteContext.Provider
      value={{
        routes: props.routes as unknown as Record<
          AppMode,
          Record<string, Route>
        >,
        appMode,
        setAppMode,
        currentRoute: currentRoute,
        setCurrentRoute: setCurrentRoute as RouteContextType['setCurrentRoute'],
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
