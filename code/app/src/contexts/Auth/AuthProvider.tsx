import { AuthContext, type Relative } from "./AuthContext";
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
  const [relatives, setRelatives] = useState<Relative[]>([]);

  useEffect(() => {
    FirebaseAuthentication.getCurrentUser().then((result) => {
      setUser(result.user);

      FirebaseFunctions.callByName<null, Relative[]>({
        name: "relatives",
      }).then(({ data }) => {
        setRelatives(data);
      });
    });
  }, []);

  const addRelative = async (phone: string) => {
    const { data } = await FirebaseFunctions.callByName<
      { add: Relative[] },
      Relative[]
    >({
      name: "relatives",
      data: { add: [{ phone }] },
    });
    setRelatives(data);
  };

  const removeRelative = async (phone: string) => {
    const { data } = await FirebaseFunctions.callByName<
      { remove: Relative[] },
      Relative[]
    >({
      name: "relatives",
      data: { remove: [{ phone }] },
    });
    setRelatives(data);
  };

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
    <AuthContext.Provider
      value={{
        getCode,
        verifyCode,
        signOut,
        user,
        relatives,
        addRelative,
        removeRelative,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
