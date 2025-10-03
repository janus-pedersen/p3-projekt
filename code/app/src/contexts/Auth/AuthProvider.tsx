import { AuthContext } from "./AuthContext";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import {
  FirebaseAuthentication,
  type User,
} from "@capacitor-firebase/authentication";
import { useEffect, useState } from "react";

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

      return token;
    });
  };
  const signOut = async () => {
    FirebaseAuthentication.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ getCode, verifyCode, signOut, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
