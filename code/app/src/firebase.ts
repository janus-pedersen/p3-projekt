// Web version of firebase.ts - used when not running on a native platform
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  connectAuthEmulator,
  browserLocalPersistence,
} from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import config from "../firebase.config.json";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
const host = import.meta.env.VITE_DEV_HOST;

// Setup the required firebase services
const app = initializeApp(config);
const auth = initializeAuth(app, { persistence: browserLocalPersistence });

if (!!host) {
  // Running in production mode, do nothing
  console.log("Running in production mode");
} else {
  // Running in development mode, connect to emulators
  console.log(`Connecting to emulators (${host})`);

  connectAuthEmulator(auth, `http://${host}:9099`);
  connectFunctionsEmulator(getFunctions(app), host, 5001);
  connectFirestoreEmulator(getFirestore(app), host, 8080);

  FirebaseFunctions.useEmulator({
    host,
  });
  FirebaseAuthentication.useEmulator({
    host,
  });
  FirebaseFirestore.useEmulator({
    host,
  });
}
