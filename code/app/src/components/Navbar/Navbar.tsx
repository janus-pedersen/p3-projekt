import { Group } from "@mantine/core";
import NavbarIcon from "./NavbarIcon/NavbarIcon";
import { useContext } from "react";
import { RouteContext } from "../../contexts/Routes/RouteContext";

export interface NavbarProps {
  transitionDuration?: number;
}

export default function Navbar() {
  const { routes, currentRoute, setCurrentRoute } = useContext(RouteContext)!;

  return (
    <Group justify={"space-around"}>
      {Object.entries(routes).map(([key, route]) => (
        <NavbarIcon
          key={key}
          icon={route.icon}
          active={currentRoute === key}
          onClick={() => setCurrentRoute(key)}
        />
      ))}
    </Group>
  );
}
