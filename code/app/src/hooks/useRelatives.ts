import type { E164Number } from "libphonenumber-js";
import { useAuth } from "./useAuth";
import {
  FirebaseFirestore,
  type DocumentReference,
} from "@capacitor-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export interface Relative {
  id: string;
  phone: E164Number;
  name?: string;
}

export interface RelativesData {
  relatives: Relative[] | null;
  loading: boolean;
  add: (phone: Relative["phone"], name?: Relative["name"]) => Promise<string>;
  remove: (id: string) => Promise<void>;
}

export const useRelatives: () => RelativesData = () => {
  const [relatives, setRelatives] = useState<Relative[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  // Relatives are stored as "user/${uid}/relatives/${id}"
  const addRelative = useCallback(
    async (phone: Relative["phone"], name?: Relative["name"]) => {
      if (!user) throw new Error("Unauthorized!");

      const result = await FirebaseFirestore.addDocument({
        reference: `users/${user.uid}/relatives`,
        data: {
          phone,
          name,
        } as Omit<Relative, "id">,
      });

      return result.reference.id;
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
    relatives,
  };
};
