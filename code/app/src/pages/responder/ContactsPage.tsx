import { Stack } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { ContactCard } from "../../components/ContactCard/ContactCard";
import { Contacts } from "@capacitor-community/contacts";

export function ContactsPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<
    {
      phone: string;
      name?: string;
    }[]
  >([]);

  useEffect(() => {
    Contacts.checkPermissions().then((result) => {
      if (result.contacts !== "granted") {
        Contacts.requestPermissions();
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setContacts([]);
      return;
    }

    const handle = FirebaseFirestore.addCollectionSnapshotListener(
      {
        reference: `users/${user.uid}/relatives`,
      },
      (collection) => {
        if (!collection) return;

        setContacts(
          collection.snapshots.map(
            (doc) =>
              ({
                ...doc.data,
              } as (typeof contacts)[number])
          )
        );
      }
    );

    return () => {
      handle.then((id) =>
        FirebaseFirestore.removeSnapshotListener({ callbackId: id })
      );
    };
  }, [user]);

  return (
    <Stack>
      <Header title="Contacts" subtitle="Manage your emergency contacts" />
      {contacts.map((contact) => (
        <ContactCard phone={contact.phone} />
      ))}
    </Stack>
  );
}
