import { ActionIcon } from "@mantine/core";
import type { ReactNode } from "react";

export interface NavbarIconProps {
  icon: ReactNode | ((active: boolean) => ReactNode);
  active: boolean;
  onClick?: () => void;
}

export default function NavbarIcon(props: NavbarIconProps) {
  return (
    <ActionIcon
      style={{
        aspectRatio: 1,
      }}
      onClick={() => props.onClick?.()}
      size={"xl"}
      color={props.active ? "white" : "primary.4"}
      variant={props.active ? "subtle" : "transparent"}
    >
      {typeof props.icon === "function" ? props.icon(props.active) : props.icon}
    </ActionIcon>
  );
}
