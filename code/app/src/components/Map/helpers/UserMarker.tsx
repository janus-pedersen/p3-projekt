import { Stack, ThemeIcon, type MantineColor, Badge } from "@mantine/core";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { User2, type LucideIcon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
// import React from "react";

export interface UserMarkerProps {
  name?: string;
  icon?: LucideIcon;
  color?: MantineColor;
  position: {
    lat: number;
    lng: number;
  };
}

export function UserMarker(props: UserMarkerProps) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      // map?.setCenter(pos);
      map?.panTo(props.position);
    }, 500);
  }, [map, props.position]);

  return (
    <AdvancedMarker position={props.position}>
      <Stack pos={"relative"}>
        <ThemeIcon
          variant={"filled"}
          color={props.color}
          radius={"xl"}
          size={"xl"}
          autoContrast
        >
          {props.icon ? (
            React.createElement(props.icon, { color: "white" })
          ) : (
            <User2 color={"white"} />
          )}
        </ThemeIcon>
        {props.name && (
          <Badge
            pos={"absolute"}
            variant={"white"}
            size="xs"
            fullWidth
            bottom={"-40%"}
            left={"50%"}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {props.name}
          </Badge>
        )}
      </Stack>
    </AdvancedMarker>
  );
}
