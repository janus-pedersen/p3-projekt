import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import { LineLayer } from "@deck.gl/layers";
import classes from "./Map.module.scss";
import { DeckGLOverlay } from "./helpers/DeckGlOverlay";
import { UserMarker } from "./helpers/UserMarker";
import { useMemo } from "react";
import Color from "color";
import { useMantineTheme, type MantineColorsTuple } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

export interface MapProps {
  people?: {
    history?: { lat: number; lng: number; timestamp: number }[];
    name: string;
  }[];
}

export function Map(props: MapProps) {
  const theme = useMantineTheme();
  //   const { colorScheme: mantineScheme } = useMantineColorScheme();
  const colorScheme = useColorScheme();

  const layers = useMemo(() => {
    if (!props.people) return [];

    console.log("Generating layers for people:", props.people);

    const created = props.people
      .map((person) => {
        // ensure we don't mutate original arrays
        const history = person.history
          ? [...person.history].sort((a, b) => a.timestamp - b.timestamp)
          : [];

        if (history.length < 2) {
          console.warn("Not enough history to draw line for", person.name);
          return null;
        }

        return new LineLayer({
          id: `line-layer-${person.name}`,
          data: history,
          getSourcePosition: (d) => [d.lng, d.lat],
          getTargetPosition: (d, ctx) => {
            const dataArr = ctx.data as typeof history;
            const nextIndex = ctx.index + 1;
            // guard against out-of-bounds; if last point, return same point
            return nextIndex < dataArr.length
              ? [dataArr[nextIndex].lng, dataArr[nextIndex].lat]
              : [d.lng, d.lat];
          },
          getColor: (_, ctx) => {
            const progress =
              ctx.index / ((ctx.data as typeof history).length - 1);

            const upperShade =
              theme.colors[theme.primaryColor][
                Math.ceil(progress * 9) as keyof MantineColorsTuple
              ];
            const lowerShade =
              theme.colors[theme.primaryColor][
                Math.floor(progress * 9) as keyof MantineColorsTuple
              ];

            // Lerp between the two shades based on progress
            return [
              ...(Color(upperShade)
                .mix(Color(lowerShade), progress % (1 / (1 / 9)))
                .rgb()
                .array() as [number, number, number]),
              progress * 255,
            ];
          },
          getWidth: (_, ctx) => {
            const progress =
              ctx.index / ((ctx.data as typeof history).length - 1);
            const min = 1;
            const max = 6;
            return min + (max - min) * progress;
          },
          parameters: {
            depthTest: false, // Ensures lines render on top
          },
        });
      })
      // remove nulls so the overlay receives only valid layers
      .filter((l) => l !== null);

    console.log("Created deck.gl layers:", created.length);
    return created;
  }, [props.people, theme.colors, theme.primaryColor]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_JS_API_KEY}>
      <GoogleMap
        className={classes.map}
        mapId={"7e7b54d503486112646f4d32"}
        defaultCenter={{ lat: 55.6761, lng: 12.5683 }}
        defaultZoom={10}
        minZoom={3}
        gestureHandling="greedy"
        colorScheme={colorScheme === "dark" ? "DARK" : "LIGHT"}
        disableDefaultUI
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
