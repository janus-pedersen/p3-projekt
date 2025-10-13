import { onCall } from "firebase-functions/https";
import { insertSnapshot, getRelativeByUid } from "./dataconnect-generated";

export const alert = onCall<{
  lat: number;
  lon: number;
}>((data, context) => {
  const { lat, lon } = data.data;

  if (!data.auth) {
    throw new Error("Unauthenticated");
  }

  void insertSnapshot({
    latitude: lat,
    longitude: lon,

    timestamp: new Date().toUTCString(),
    uid: data.auth.uid,
  });

  
});
