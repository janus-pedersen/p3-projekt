import { onCall } from "firebase-functions/https";
import * as admin from "firebase-admin";
import { insertSnapshot, getRelativesByUid } from "@dataconnect/generated";
import { client, TWILIO_FROM_NUMBER } from "./twilio";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const alert = onCall<{
  lat: number;
  lon: number;
}>(async (data, context) => {
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

  const name = (await admin.auth().getUser(data.auth.uid)).displayName;

  const relatives = await getRelativesByUid({ uid: data.auth.uid });
  relatives.data.relatives.forEach((relative) => {
    console.log("Alerting relative:", relative.phone);
    client.messages.create({
      to: relative.phone,
      from: TWILIO_FROM_NUMBER.value(),
      body: `${
        name ?? "Your relative"
      } has fallen! See more information in the app. Location: https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });
  });
});
