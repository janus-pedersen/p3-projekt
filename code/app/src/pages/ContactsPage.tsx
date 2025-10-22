import { Contacts, type ContactPayload } from "@capacitor-community/contacts";
import { Stack, ActionIcon, Title, Divider, Paper, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Header } from "../components/Header/Header";
import { useRelatives } from "../hooks/useRelatives";
import type { Relative } from "../hooks/useRelatives";
import {
  ContactCard,
  type Contact,
} from "../components/ContactCard/ContactCard";
import { Plus, X } from "lucide-react";

export function ContactsPage() {
  const { user } = useAuth();
  const {
    relatives,
    add: addRelative,
    remove: removeRelative,
  } = useRelatives();

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

  // Helper to E164-normalize a raw number (defaults to DK if no country in the string)
  const toE164 = useCallback(
    (num?: string | null) =>
      num ? parsePhoneNumberFromString(num, "DK")?.number : undefined,
    []
  );

  // Build lookups and sorted lists
  const contactsSorted = useMemo(
    () =>
      contacts
        .slice()
        .sort(
          (a, b) => a.name?.display?.localeCompare(b.name?.display ?? "") || 0
        ),
    [contacts]
  );

  const relativesSorted = useMemo(
    () =>
      (relatives ?? [])
        .slice()
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
    [relatives]
  );

  const phoneLookup = useMemo(() => {
    const m = new Map<
      string,
      { contact: ContactPayload; label?: string; avatar?: string }
    >();
    contacts.forEach((c) => {
      (c.phones ?? []).forEach((p) => {
        const e164 = toE164(p.number ?? undefined);
        if (e164) {
          m.set(e164, {
            contact: c,
            label: p.label || p.type,
            avatar: c.image?.base64String ?? undefined,
          });
        }
      });
    });
    return m;
  }, [contacts, toE164]);

  const relativesByPhone = useMemo(() => {
    const m = new Map<string, Relative>();
    (relatives ?? []).forEach((r) => m.set(r.phone, r));
    return m;
  }, [relatives]);

  // Presentational helpers
  const EmptyState = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <Paper shadow="xs" p="md">
      <Stack gap={4}>
        <Text fw={600}>{title}</Text>
        {subtitle && (
          <Text size="sm" c="dimmed">
            {subtitle}
          </Text>
        )}
      </Stack>
    </Paper>
  );

  const renderRemoveButton = useCallback(
    (onClick: () => void) => (
      <ActionIcon
        color="red"
        variant="light"
        size="md"
        radius="xl"
        onClick={onClick}
      >
        <X size={18} />
      </ActionIcon>
    ),
    []
  );

  const renderToggleButton = useCallback(
    (existing: boolean, onClick: () => void) => (
      <ActionIcon
        color={existing ? "red" : "primary"}
        variant="light"
        size="md"
        radius="xl"
        onClick={onClick}
      >
        {existing ? <X size={18} /> : <Plus size={18} />}
      </ActionIcon>
    ),
    []
  );

  // Relatives section: enrich with local contact info when available
  const relativeCards = relativesSorted.map((rel) => {
    const match = phoneLookup.get(rel.phone);
    const displayName = match?.contact.name?.display || rel.name || rel.phone;
    const label = match?.label || "relative";
    return (
      <ContactCard
        key={rel.id}
        info={{
          name: displayName,
          avatar: match?.avatar,
          phone: [
            {
              label,
              number: rel.phone,
              action: renderRemoveButton(() => removeRelative(rel.id)),
            },
          ],
        }}
      />
    );
  });

  return (
    <>
      <Header title={"Contacts"} subtitle={"Manage your contacts here."} />

      <Stack mt={"xl"} gap={"xl"}>
        <div>
          <Title order={3}>Emergency contacts</Title>
          <Stack mt="md" gap="md">
            {relativeCards.length > 0 ? (
              relativeCards
            ) : (
              <EmptyState
                title="No relatives added yet"
                subtitle="Add relatives from your contacts below to manage quick notifications."
              />
            )}
          </Stack>
        </div>

        <Divider />

        <div>
          <Title order={3}>All contacts</Title>
          <Stack mt="md" gap="md">
            {contactsSorted.map((contact) => {
              const numbers: Contact["phone"] =
                contact.phones
                  ?.map((phone): Contact["phone"][number] | undefined => {
                    const parsedNumber = toE164(phone.number ?? undefined);
                    if (!parsedNumber) return undefined;

                    const existing = relativesByPhone.get(parsedNumber);

                    return {
                      label: phone.label || phone.type,
                      number: parsedNumber,
                      action: renderToggleButton(!!existing, () => {
                        if (existing) {
                          removeRelative(existing.id);
                        } else {
                          addRelative(
                            parsedNumber,
                            contact.name?.display ?? undefined
                          );
                        }
                      }),
                    } as Contact["phone"][number];
                  })
                  .filter(
                    (phone): phone is Contact["phone"][number] =>
                      phone !== undefined
                  ) ?? [];

              return (
                <ContactCard
                  key={contact.contactId}
                  info={{
                    name: contact.name?.display ?? "???",
                    avatar: contact.image?.base64String ?? undefined,
                    phone: numbers,
                  }}
                />
              );
            })}
          </Stack>
        </div>
      </Stack>
    </>
  );
}
