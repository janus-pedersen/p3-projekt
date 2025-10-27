import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../hooks/useAuth";

export function MapPage() {
  const { user } = useAuth();

  const [snapshots, setSnaphots] = useState<
    {
      latitude: number;
      longitude: number;
      accuracy: number;
      timestamp: number;
    }[]
  >([]);

  useEffect(() => {
    if (!user?.uid) return;

    const handler = FirebaseFirestore.addCollectionSnapshotListener(
      {
        reference: `users/${user.uid}/snapshots`,
      },
      (collection) => {
        if (!collection) return;
        setSnaphots(
          collection.snapshots.map(
            (doc) =>
              ({
                ...doc.data,
              } as (typeof snapshots)[number])
          )
        );
      }
    );

    return () => {
      handler.then((id) =>
        FirebaseFirestore.removeSnapshotListener({ callbackId: id })
      );
    };
  }, [user]);

  return (
    <>
      <Header title="Map" />
      <Map
        people={[
          {
            history: snapshots.map((snapshot) => ({
              lat: snapshot.latitude,
              lng: snapshot.longitude,
              timestamp: snapshot.timestamp,
            })),
            name: "You",
          },
        ]}
      />
    </>
  );
}
