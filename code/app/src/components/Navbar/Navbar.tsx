import { Group, Stack, Text } from "@mantine/core";
import NavbarIcon from "./NavbarIcon/NavbarIcon";
import { useContext } from "react";
import { RouteContext } from "../../contexts/Routes/RouteContext";

export interface NavbarProps {
  transitionDuration?: number;
}

export default function Navbar() {
  const { routes, currentRoute, appMode, setCurrentRoute } =
    useContext(RouteContext)!;

  const currentRoutes = routes[appMode];

  return (
    <Group justify={"space-around"}>
      {Object.entries(currentRoutes).map(([key, route]) => (
        <Stack gap={0} align="center" key={key}>
          <NavbarIcon
            icon={route.icon}
            active={currentRoute === key}
            onClick={() => setCurrentRoute(key)}
          />
          <Text size={"xs"} c={"dimmed"}>
            {route.label}
          </Text>
        </Stack>
      ))}
    </Group>
  );
}
