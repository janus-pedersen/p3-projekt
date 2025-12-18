import { Dialog } from "@capacitor/dialog";
import { Geolocation } from "@capacitor/geolocation";
import { Keyboard } from "@capacitor/keyboard";
import { LocalNotifications } from "@capacitor/local-notifications";
import type { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { BleClient, ScanMode } from "@capacitor-community/bluetooth-le";
import { Contacts, PhoneType, type ContactPayload } from "@capacitor-community/contacts";
import {
  FirebaseAuthentication,
  type User,
} from "@capacitor-firebase/authentication";
import { FirebaseFirestore, type DocumentReference } from "@capacitor-firebase/firestore";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { registerPlugin } from "@capacitor/core";

export const BackgroundGeolocation =
  registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

export {
  BleClient,
  Contacts,
  Dialog,
  FirebaseAuthentication,
  FirebaseFirestore,
  FirebaseFunctions,
  Geolocation,
  Keyboard,
  LocalNotifications,
  PhoneType,
  ScanMode,
};

export type { ContactPayload };
export type { DocumentReference };
export type { User };
