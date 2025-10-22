import { Avatar, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import type { E164Number } from "libphonenumber-js";
import type React from "react";

export interface Contact {
  name: string;
  phone: { label: string; number: E164Number; action: React.ReactNode }[];
  avatar?: string;
}

export type ContactCardProps = {
  info: Contact;
};

export function ContactCard(props: ContactCardProps) {
  return (
    <Paper shadow="xs" p={"sm"}>
      <Group align="flex-start" w={"100%"}>
        <Avatar src={props.info.avatar} name={props.info.name} />
        <Stack gap={"xs"} style={{ flex: 1 }}>
          <Text ff={"heading"} fz={"lg"}>
            {props.info.name}
          </Text>
          {props.info.phone.map((phone, i) => (
            <>
              <Group
                wrap="nowrap"
                justify={"space-between"}
                key={phone.number}
                w="100%"
              >
                <Stack gap={0} w={"100%"}>
                  <Text fz={"xs"} fw={"bold"} c={"dimmed"}>
                    {phone.label}
                  </Text>
                  <Text ff={"monospace"} fz={"md"}>
                    {phone.number}
                  </Text>
                </Stack>

                {phone.action}
              </Group>
              {i < props.info.phone.length - 1 && <Divider />}
            </>
          ))}
        </Stack>
      </Group>
    </Paper>
  );
}
