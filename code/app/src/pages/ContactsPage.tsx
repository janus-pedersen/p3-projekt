import {
  Contacts,
  PhoneType,
  type ContactPayload,
} from "@capacitor-community/contacts";
import { Stack, Text, Group, Avatar, Divider, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import parsePhoneNumberFromString from "libphonenumber-js";
import { PlusIcon } from "lucide-react";
import { Header } from "../components/Header/Header";

export function ContactsPage() {
  const { user } = useAuth();

  const [contacts, setContacts] = useState<ContactPayload[]>([]);

  useEffect(() => {
    Contacts.getContacts({
      projection: {
        image: true,
        phones: true,
        name: true,
      },
    }).then((result) => {
      setContacts(result.contacts);
    });
  }, [user?.phoneNumber]);

  return (
    <>
      <Header title={"Contacts"} subtitle={"Manage your contacts here."} />

      <Divider label={"Emergency Contacts"} />

      <Divider label={"All Contacts"} />

      <Stack mt={"xl"} gap={"md"}>
        {contacts
          .sort(
            (a, b) => a.name?.display?.localeCompare(b.name?.display ?? "") || 0
          )
          .map((contact) => (
            <Group key={contact.contactId} wrap="nowrap">
              <Avatar
                src={contact.image?.base64String}
                name={contact.name?.display ?? undefined}
                alt="Contact Avatar"
                radius="xl"
              />
              <Stack gap={0}>
                <Text size="lg">{contact.name?.display ?? "No Name"}</Text>
                <Text size="sm" c="dimmed">
                  {
                    parsePhoneNumberFromString(
                      (
                        contact.phones?.find(
                          (phone) => phone.type === PhoneType.Mobile
                        ) ?? contact.phones?.[0]
                      )?.number ?? "",
                      {
                        defaultCountry: "DK",
                      }
                    )?.number
                  }
                </Text>
              </Stack>
              <ActionIcon ml={"auto"} variant={"transparent"}>
                <PlusIcon size={18} />
              </ActionIcon>
            </Group>
          ))}
      </Stack>
    </>
  );
}
