import { Group, Stack, Text } from "@mantine/core";
import NavbarIcon from "./NavbarIcon/NavbarIcon";
import { useContext } from "react";
import { RouteContext } from "../../contexts/Routes/RouteContext";
import { useTranslation } from "react-i18next";

export interface NavbarProps {
  transitionDuration?: number;
}

export default function Navbar() {
  const { routes, currentRoute, appMode, setCurrentRoute } =
    useContext(RouteContext)!;

  const { t } = useTranslation();

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
          <Text size={"sm"} c={currentRoute === key ? "white" : "primary.3"}>
            {t(route.label)}
          </Text>
        </Stack>
      ))}
    </Group>
  );
}
