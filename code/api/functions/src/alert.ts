import { onCall } from "firebase-functions/https";
import * as admin from "firebase-admin";
import { client, TWILIO_FROM_NUMBER } from "./twilio";
import { getRelated } from "./related";

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

  const uid = data.auth.uid;

  // insert snapshot using Admin SDK to avoid client SDK "no-app" error
  try {
    await admin.firestore().collection("snapshots").add({
      uid,
      latitude: lat,
      longitude: lon,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to write snapshot to Firestore:", err);
  }

  // create initial alert doc in Firestore
  const alertsCol = admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("alerts");
  const alertDocRef = await alertsCol.add({
    type: "fall", // default type; adjust if you support multiple types
    stage: "pending", // pending until notifications are attempted
    uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    location: new admin.firestore.GeoPoint(lat, lon),
    latitude: lat,
    longitude: lon,
    // ...other helpful fields can be added here...
  });

  const name = (await admin.auth().getUser(uid)).displayName;
  const phone = (await admin.auth().getUser(uid)).phoneNumber;

  if (!phone) {
    throw new Error("User has no phone number");
  }

  const relatives = await getRelated(uid, phone);

  // notify relatives and collect results
  const notifyResults = await Promise.all(
    relatives.map(async (relative) => {
      if (!relative) return;

      try {
        let msg;
        if (relative?.phone) {
          msg = await client.messages.create({
            to: relative.phone,
            from: TWILIO_FROM_NUMBER.value(),
            body: `${
              name ?? "Your relative"
            } has fallen! See more information in the app. Location: https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
          });
          console.log("Alerted relative:", relative.phone);
        }

        return {
          success: true,
          phone: relative?.phone,
          relativeUid: (relative as any).uid ?? null,
          messageSid: msg?.sid,
          notifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
      } catch (err) {
        console.error("Failed to alert relative:", relative.phone, err);
        return {
          success: false,
          phone: relative.phone,
          relativeUid: (relative as any).uid ?? null,
          error: String(err),
        };
      }
    })
  );

  // update alert doc with notification details and final stage
  await alertDocRef.set(
    {
      notifiedRelatives: notifyResults,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
});

export const alerts = onCall<{}>(async (data, context) => {
  // Get the relatives of the user
  const user = data.auth;
  const phone = await admin
    .auth()
    .getUser(data.auth?.uid || "")
    .then((u) => u.phoneNumber);

  if (!phone) {
    throw new Error("User has no phone number");
  }

  const relatives = await getRelated(user?.uid || "", phone);

  // For each relative, get their alerts
  const alerts = await Promise.all(
    relatives.map(async (relative) => {
      if (!relative) return [];

      const alertsSnapshot = await admin
        .firestore()
        .collection("users")
        .doc((relative as any).uid)
        .collection("alerts")
        .orderBy("createdAt", "desc")
        .get();

      return alertsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
        uid: (relative as any).uid,
      }));
    })
  );

  return {
    alerts: alerts.flat(),
  };
});
