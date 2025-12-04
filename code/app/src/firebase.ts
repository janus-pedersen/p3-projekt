// Web version of firebase.ts - used when not running on a native platform
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserLocalPersistence,
} from "firebase/auth";

import config from "../firebase.config.json";
const app = initializeApp(config);
initializeAuth(app, { persistence: browserLocalPersistence });
