import {
  ActionIcon,
  Avatar,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useEffect, useMemo, useState } from "react";
import { getContactByPhone } from "../../utils/getUserContact";
import type { ContactPayload } from "@capacitor-community/contacts";
import { Trash2 } from "lucide-react";

export type ContactCardProps = {
  phone: string;
  name?: string;

  onDelete?: () => void;
};

export function ContactCard(props: ContactCardProps) {
  const [deleting, setDeleting] = useState(false);

  const parsed = useMemo(() => {
    return parsePhoneNumberFromString(props.phone ?? "", {
      defaultCountry: "DK",
    });
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
    <Paper p={"sm"} bg={"transparent"}>
      <Group>
        <Avatar
          color="primary"
          name={props.name ?? contact?.name?.display ?? undefined}
          src={contact?.image?.base64String}
        />
        <Stack gap={0}>
          <Text fw={500} fz={"lg"}>
            {contact?.name?.display ?? props.name}
          </Text>
          <Text fz={"sm"} ff={"monospace"}>
            {parsed.number}
          </Text>
        </Stack>

        {props.onDelete && (
          <ActionIcon
            color="red"
            ml={"auto"}
            size={"lg"}
            radius={"xl"}
            variant={"light"}
            onClick={async () => {
              setDeleting(true);
              await props.onDelete?.();
              setDeleting(false);
            }}
          >
            {deleting ? (
              <Loader size={"xs"} color="red" />
            ) : (
              <Trash2 size={18} />
            )}
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
}
