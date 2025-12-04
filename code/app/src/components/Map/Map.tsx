import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import classes from "./Map.module.scss";
import { DeckGLOverlay } from "./helpers/DeckGlOverlay";
import { useMemo } from "react";
import { useColorScheme } from "@mantine/hooks";
import { UserTrail } from "./helpers/UserTrail";
import { useMantineTheme } from "@mantine/core";
import { UserMarker } from "./helpers/UserMarker";

export interface MapProps {
  people?: {
    history?: {
      lat: number;
      lng: number;
      accuracy: number;
      timestamp: number;
    }[];
    name: string;
  }[];
  style?: React.CSSProperties;
  id?: string;
}

export function Map(props: MapProps) {
  //   const { colorScheme: mantineScheme } = useMantineColorScheme();
  const colorScheme = useColorScheme();
  const theme = useMantineTheme();

  const layers = useMemo(() => {
    if (!props.people) return [];

    return props.people.map((person) => {
      return UserTrail(person, theme);
    });
  }, [props.people, theme]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_JS_API_KEY}>
      <GoogleMap
        className={classes.map}
        mapId={props.id}
        defaultCenter={{ lat: 55.6761, lng: 12.5683 }}
        defaultZoom={10}
        minZoom={3}
        gestureHandling="greedy"
        // renderingType={"VECTOR"}
        colorScheme={colorScheme === "dark" ? "DARK" : "LIGHT"}
        disableDefaultUI
        style={props.style}
      >
        <DeckGLOverlay layers={layers} />

        {props.people?.map((person) => {
          // do not mutate history when determining latest
          const sorted = person.history
            ? [...person.history].sort((a, b) => b.timestamp - a.timestamp)
            : [];
          const latest = sorted?.[0];
          if (!latest) return null;

          return (
            <UserMarker
              name={person.name}
              position={{
                lat: latest.lat,
                lng: latest.lng,
              }}
            />
          );
        })}
      </GoogleMap>
    </APIProvider>
  );
}
