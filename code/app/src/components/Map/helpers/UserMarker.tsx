import { Stack, ThemeIcon, Badge } from "@mantine/core";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { User2 } from "lucide-react";

export interface UserMarkerProps {
  name?: string;
  position: {
    lat: number;
    lng: number;
  };
}

export function UserMarker(props: UserMarkerProps) {
  const map = useMap();

  return (
    <AdvancedMarker
      position={props.position}
      onClick={() => {
        map?.moveCamera({
          center: {
            lat: props.position.lat,
            lng: props.position.lng,
          },
          zoom: (map.getZoom() ?? 2) + 3,
        });
      }}
    >
      <Stack pos={"relative"}>
        <ThemeIcon
          variant={"filled"}
          color={"primary"}
          radius={"xl"}
          size={"xl"}
          autoContrast
        >
          <User2 />
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
