import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export function MapRepaintFix() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("tilesloaded", () => {
      map.panBy(0, 0);
    });

    return () => listener.remove();
  }, [map]);

  return null;
}
