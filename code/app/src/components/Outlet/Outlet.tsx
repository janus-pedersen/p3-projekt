import { useContext } from "react";
import { RouteContext } from "../../contexts/Routes/RouteContext";

export function Outlet() {
  const { currentRoute, routes, appMode } = useContext(RouteContext)!;

  const component = routes[appMode][currentRoute]?.component;

  return (
    <>
      {component ?? (
        <div>
          {appMode} -{currentRoute}
        </div>
      )}
    </>
  );
}
