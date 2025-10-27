import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useEffect, useMemo, useState } from "react";
import { getContactByPhone } from "../../utils/getUserContact";
import type { ContactPayload } from "@capacitor-community/contacts";

export type ContactCardProps = {
  phone: string;
  name?: string;
};

export function ContactCard(props: ContactCardProps) {
  const parsed = useMemo(() => {
    return parsePhoneNumberFromString(props.phone, { defaultCountry: "DK" });
  }, [props.phone]);

  const [contact, setContact] = useState<ContactPayload | undefined>(undefined);

  useEffect(() => {
    if (!parsed) return;
    getContactByPhone(parsed.number).then((contact) => {
      setContact(contact);
      console.log("Fetched contact for", parsed?.number, contact);
    });
  }, [parsed]);

  if (!parsed) return null;

  return (
    <Paper shadow="xs" p={"sm"}>
      <Group>
        <Avatar src={contact?.image?.base64String} />
        <Stack gap={0}>
          <Text fw={500} fz={"lg"}>
            {contact?.name?.display ?? props.name}
          </Text>
          <Text fz={"sm"} ff={"monospace"}>
            {parsed.number}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
