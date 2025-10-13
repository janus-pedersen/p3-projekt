import { AuthContext } from "./AuthContext";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { Capacitor } from "@capacitor/core";
import {
  FirebaseAuthentication,
  type User,
} from "@capacitor-firebase/authentication";
import { useEffect, useState } from "react";
import { getContactByPhone } from "../../utils/getUserContact";

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
    if (Capacitor.isNativePlatform())
      FirebaseAuthentication.getCurrentUser().then((result) => {
        setUser(result.user);
      });
  }, []);

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

      const result = await FirebaseAuthentication.signInWithCustomToken({
        token,
      });

      setUser(result.user);

      // Get the user from the contacts on the phone, and update the display name
      if (!result.user?.displayName && result.user?.phoneNumber) {
        console.log("Looking for contact...");
        getContactByPhone(result.user?.phoneNumber).then((contact) => {
          if (contact && !result.user?.displayName) {
            console.log("Found contact:", contact);
            console.log(
              "Updating user display name to:",
              contact.name?.display
            );
            updateUser({ displayName: contact.name?.display });
          }
        });
      }

      return token;
    });
  };

  const updateUser = async (data: Partial<User>) => {
    // if (!user) throw new Error("No user");

    const newUser = await FirebaseFunctions.callByName<Partial<User>, User>({
      name: "update",
      data: {
        ...data,
      },
    });

    if (newUser) setUser(newUser.data as User);
  };

  const signOut = async () => {
    FirebaseAuthentication.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ getCode, verifyCode, signOut, updateUser, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
