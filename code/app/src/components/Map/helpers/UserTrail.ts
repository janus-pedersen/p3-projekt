import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import { type Layer } from "@deck.gl/core";
import type { MapProps } from "../Map";
import { type MantineTheme } from "@mantine/core";
import Color, { type ColorInstance } from "color";
import { TimeRange } from "./TimeRange";

/**
 * Generates layers representing user trails.
 */
export function UserTrail(
  person: NonNullable<MapProps["people"]>[number],
  theme: MantineTheme
): Layer[] {
  if (!person.history) return [];

  const dark = Color(
    getComputedStyle(document.documentElement).getPropertyValue(
      theme.colors[theme.primaryColor][8].replace(
        /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\s*\)/g,
        "$1"
      )
    )
  );

  const light = Color(
    getComputedStyle(document.documentElement).getPropertyValue(
      theme.colors[theme.primaryColor][4].replace(
        /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\s*\)/g,
        "$1"
      )
    )
  );

  const windowMs = TimeRange["ONE_WEEK"];
  const cutoff = Date.now() - windowMs;

  // keep points that are within the last `windowMs` (i.e. timestamp >= cutoff)
  const sorted = person.history
    .sort((a, b) => a.timestamp - b.timestamp)
    .filter((h) => h.timestamp >= cutoff);
  const current = sorted[sorted.length - 1];

  console.log("Current position:", current);
  if (!current) return [];

  const path = sorted.map((h) => [h.lng, h.lat] as [number, number]);

  const segmentationThreshold = 0.005; // Approx ~500 meters, adjust as needed
  const segments: { path: [number, number][]; color: ColorInstance }[] = [
    {
      path: [path[0]],
      color: dark,
    },
  ];

  for (let i = 1; i < path.length; i++) {
    // Check if the distance between the last point in the current segment and the current point is greater than a threshold
    const lastPoint =
      segments[segments.length - 1].path[
        segments[segments.length - 1].path.length - 1
      ];

    const distance = Math.sqrt(
      Math.pow(path[i][0] - lastPoint[0], 2) +
        Math.pow(path[i][1] - lastPoint[1], 2)
    );

    if (distance > segmentationThreshold) {
      // Start a new segment
      segments.push({
        path: [path[i]],
        color: dark,
      });
    } else {
      // Continue the current segment
      segments[segments.length - 1].path.push(path[i]);
    }
  }

  return [
    new ScatterplotLayer({
      id: `user-trail-current-${person.name}`,
      data: [current],
      // deck.gl expects [lng, lat]
      getPosition: (d: typeof current) => [d.lng, d.lat],
      // If accuracy is absent, fall back to a small visible radius (meters)
      getRadius: (d: typeof current) => d.accuracy ?? 200,
      getFillColor: light.array().concat(150) as [
        number,
        number,
        number,
        number
      ],
      getLineColor: () => light.array() as [number, number, number],
      lineWidthUnits: "pixels",
      radiusUnits: "meters",
    }),
    ...segments.map(
      (segment, i) =>
        new PathLayer({
          id: `user-path-${person.name}-segment-${i}`,
          data: [{ path: segment.path }],
          getPath: (d) => d.path,
          getWidth: () => Math.max(2, (i / segments.length) * 6),
          widthUnits: "pixels",
          getColor: () =>
            dark.mix(light, i / segments.length).array() as [
              number,
              number,
              number
            ],
          capRounded: true,
        })
    ),
    ...segments.slice(0, -1).map((segment, i) => {
      const start = segment.path[segment.path.length - 1];
      const end = segments[i + 1].path[0];
      const dashCount =
        Math.sqrt(
          Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
        ) * 2500; // Adjust multiplier for dash density
      const dashes: { path: [number, number][] }[] = [];

      // Generate alternating visible line segments between start and end
      for (let j = 0; j < dashCount; j += 2) {
        const t1 = j / dashCount;
        const t2 = (j + 1) / dashCount;
        dashes.push({
          path: [
            [
              start[0] + (end[0] - start[0]) * t1,
              start[1] + (end[1] - start[1]) * t1,
            ],
            [
              start[0] + (end[0] - start[0]) * t2,
              start[1] + (end[1] - start[1]) * t2,
            ],
          ],
        });
      }

      return new PathLayer({
        id: `user-path-dashed-${person.name}-${i}`,
        data: dashes,
        getPath: (d) => d.path,
        getColor: light.array().concat(150) as [number, number, number, number],
        getWidth: 2,
        widthUnits: "pixels",
      });
    }),
  ];
}
