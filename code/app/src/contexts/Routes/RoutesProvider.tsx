import { useState } from "react";
import { RouteContext, type Route } from "./RouteContext";

export function RoutesProvider(
  props: React.PropsWithChildren<{
    routes: Record<string, Route>;
  }>
) {
  const [currentRoute, setCurrentRoute] = useState<keyof typeof props.routes>(
    Object.keys(props.routes)[0]
  );

  return (
    <RouteContext.Provider
      value={{
        routes: props.routes,
        currentRoute,
        setCurrentRoute,
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
