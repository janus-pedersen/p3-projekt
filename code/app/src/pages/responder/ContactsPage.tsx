import { ActionIcon, Stack } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { ContactCard } from "../../components/ContactCard/ContactCard";
import { Contacts } from "@capacitor-community/contacts";
import { Plus } from "lucide-react";
import { useModals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { useRelatives } from "../../hooks/useRelatives";
import parsePhoneNumberFromString from "libphonenumber-js";

export function ContactsPage() {
  const { user } = useAuth();
  const { add: addRelative } = useRelatives();
  const [contacts, setContacts] = useState<
    {
      phone: string;
      name?: string;
      id: string;
    }[]
  >([]);

  const modals = useModals();
  const { t } = useTranslation();

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
                id: doc.id,
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
      <Header
        title={t("navigation.contacts")}
        subtitle={t("contacts.subtitle")}
        action={
          <ActionIcon
            onClick={() => {
              const id = modals.openContextModal("guardian", {
                innerProps: {
                  onComplete: async (contact) => {
                    if (user?.uid !== undefined) {
                      const number = parsePhoneNumberFromString(
                        contact.phone,
                        "DK"
                      )?.number;
                      if (!number) return;

                      await addRelative(number, contact.name);
                      modals.closeContextModal(id);
                    }
                  },
                },
              });
            }}
            variant={"filled"}
            size={"lg"}
            radius={"xl"}
          >
            <Plus size={20} />
          </ActionIcon>
        }
      />
      {contacts.map((contact) => (
        <ContactCard
          phone={contact.phone}
          name={contact.name}
          onDelete={() => {
            if (user?.uid)
              FirebaseFirestore.deleteDocument({
                reference: `users/${user.uid}/relatives/${contact.id}`,
              });
          }}
        />
      ))}
    </Stack>
  );
}
