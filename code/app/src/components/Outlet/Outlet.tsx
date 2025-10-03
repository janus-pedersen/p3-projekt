import { useContext } from "react";
import { RouteContext } from "../../contexts/Routes/RouteContext";

export function Outlet() {
  const { currentRoute, routes } = useContext(RouteContext)!;

  return <>{routes[currentRoute].component}</>;
}
