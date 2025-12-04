import { parsePhoneNumberFromString, type E164Number } from "libphonenumber-js";
import { useAuth } from "./useAuth";
import {
  FirebaseFirestore,
  type DocumentReference,
} from "@capacitor-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FirebaseFunctions } from "@capacitor-firebase/functions";

export interface Relative {
  id: string;
  phone: E164Number;
  name?: string;
}

export interface RelativesData {
  relatives: Relative[];
  related: Relative[];
  loading: boolean;
  add: (phone: Relative["phone"], name?: Relative["name"]) => Promise<string>;
  remove: (id: string) => Promise<void>;
}

export const useRelatives: () => RelativesData = () => {
  const [relatives, setRelatives] = useState<Relative[]>([]);
  const [related, setRelated] = useState<RelativesData["related"]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRelated = () => {
      FirebaseFunctions.callByName({
        name: "related",
        data: {},
      })
        .then((result) => {
          const { related } = result.data as {
            related: { uid: string; name: string; phone: string }[];
          };

          setRelated(
            related.map((r) => ({
              id: r.uid,
              name: r.name,
              phone: parsePhoneNumberFromString(r.phone)?.number as E164Number,
            }))
          );
        })
        .catch(() => {});
    };

    const interval = setInterval(fetchRelated, 10_000);
    fetchRelated();

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    FirebaseFirestore.addCollectionSnapshotListener(
      {
        reference: `user/${user?.uid}/relatives`,
      },
      (event) => {
        if (!event) return;
        setLoading(false);

        setRelatives((prev) => [
          ...prev.filter(
            (p) => !event.snapshots.some((snapshot) => snapshot.id === p.id)
          ),
          ...event.snapshots.map(
            (relative) =>
              ({
                ...relative.data,
                id: relative.id,
              } as Relative)
          ),
        ]);
      }
    );
  }, [user]);

  const addRelative = useCallback(
    async (phone: Relative["phone"], name?: Relative["name"]) => {
      if (!user) throw new Error("Unauthorized!");

      const ref = `users/${user.uid}/relatives/${phone}`;
      await FirebaseFirestore.setDocument({
        reference: ref,
        data: { phone, name } as Omit<Relative, "id">,
      });

      return phone; // since phone is now the doc ID
    },
    [user]
  );

  const removeRelative = useCallback(
    (id: DocumentReference["id"]) => {
      if (!user) throw new Error("Unauthorized!");

      return FirebaseFirestore.deleteDocument({
        reference: `users/${user.uid}/relatives/${id}`,
      });
    },
    [user]
  );

  return {
    loading,
    add: addRelative,
    remove: removeRelative,
    related,
    relatives,
  };
};
