import {
  GoogleMapsOverlay as DeckOverlay,
  type GoogleMapsOverlayProps,
} from "@deck.gl/google-maps";
import { useMap } from "@vis.gl/react-google-maps";
import { useMemo, useEffect } from "react";

export function DeckGLOverlay(props: Partial<GoogleMapsOverlayProps>) {
  const map = useMap();
  const overlay = useMemo(() => new DeckOverlay(props), [props]);

  useEffect(() => {
    overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [map, overlay]);

  overlay.setProps(props);
  return null;
}
