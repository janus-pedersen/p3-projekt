import { registerPlugin } from "@capacitor/core";
import type { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";

import { AuthContext } from "./AuthContext";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import {
  FirebaseAuthentication,
  type User,
} from "@capacitor-firebase/authentication";
import * as auth from "firebase/auth";
import { useEffect, useState } from "react";
import { getContactByPhone } from "../../utils/getUserContact";
import { Dialog } from "@capacitor/dialog";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  "BackgroundGeolocation"
);

export type VerifyPayload = {
  phone: string;
  code?: string;
};

export type VerifyResponse =
  | {
      token: string;
    }
  | string;

export default function AuthProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const result = await FirebaseAuthentication.getCurrentUser();

      setUser(result.user);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;

    const watcher = BackgroundGeolocation.addWatcher(
      {
        requestPermissions: true, // Only request permissions if user is logged in
        backgroundMessage: "Continue tracking your location?",
        backgroundTitle: "App is tracking your location",
        distanceFilter: 10,
      },
      async (location, error) => {
        if (error || !location) {
          if (!error) return;
          switch (error.code) {
            case "NOT_AUTHORIZED":
              Dialog.alert({
                message:
                  "This app is not authorized to use background location updates. Please enable location permissions in your device settings.",
                title: "Location Permission Denied",
                buttonTitle: "OK",
              }).then(() => BackgroundGeolocation.openSettings());
              break;
            default:
              console.error("Error getting location:", error);
          }

          return;
        }

        const document = await FirebaseFirestore.addDocument({
          reference: `users/${user.uid}/snapshots`,
          data: {
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: location.accuracy,
            timestamp: location.time,
          },
        });
        console.log("Location update:", document, location);

        // TODO: Send location to server
      }
    );

    return () => {
      watcher.then((id) => {
        BackgroundGeolocation.removeWatcher({ id });
      });
    };
  }, [user]);

  const getCode = async (phone: string) => {
    return FirebaseFunctions.callByName<VerifyPayload, VerifyResponse>({
      name: "verify",
      data: {
        phone,
      },
    });
  };

  const verifyCode = async (phone: string, code: string) => {
    return FirebaseFunctions.callByName<VerifyPayload, VerifyResponse>({
      name: "verify",
      data: {
        phone,
        code,
      },
    }).then(async ({ data }) => {
      if (typeof data === "string") {
        throw new Error(data);
      }
      const token = data.token;

      await auth.signInWithCustomToken(auth.getAuth(), token);
      const result = await FirebaseAuthentication.signInWithCustomToken({
        token,
      });

      setUser(result.user);

      // Get the user from the contacts on the phone, and update the display name
      if (result.user?.phoneNumber) {
        console.log("Looking for contact...");
        getContactByPhone(result.user?.phoneNumber).then((contact) => {
          if (contact) {
            updateUser({
              displayName: result.user?.displayName || contact.name?.display,
              photoUrl: result.user?.photoUrl || contact.image?.base64String,
            });
          }
        });
      }

      return token;
    });
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) throw new Error("No user");

    const newUser = await FirebaseFunctions.callByName<Partial<User>, User>({
      name: "update",
      data: {
        ...data,
      },
    });

    if (newUser) setUser(newUser.data as User);

    // await FirebaseAuthentication.updateProfile({

    // })
  };

  const signOut = async () => {
    FirebaseAuthentication.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        getCode,
        verifyCode,
        signOut,
        user,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
