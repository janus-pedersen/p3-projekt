import {
  ActionIcon,
  Alert,
  Collapse,
  Group,
  Title,
  Text,
  ButtonGroup,
  Button,
  Badge,
  Stack,
  Box,
} from "@mantine/core";
import type { FallAlert, FallStage, FallType } from "../../utils/alert";
import { useDisclosure } from "@mantine/hooks";
import {
  Ban,
  Check,
  ChevronDown,
  ChevronUp,
  ClockAlert,
  Hammer,
  Hourglass,
  MapPin,
  Megaphone,
  Phone,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import React from "react";
import { useRelativeTime } from "../../hooks/useRelativeTime";
import { useTranslation } from "react-i18next";
import { useRelatives } from "../../hooks/useRelatives";
import { UserMarker } from "../Map/helpers/UserMarker";
import { Map } from "../Map/Map";
import { ContactCard } from "../ContactCard/ContactCard";
import parsePhoneNumberFromString, { type E164Number } from "libphonenumber-js";

export function FallAlert(props: { alert: FallAlert }) {
  const { related } = useRelatives();
  const relative = related.find((r) => r.id === props.alert.uid);

  const time = useRelativeTime(new Date(props.alert.createdAt._seconds * 1000));
  const { t } = useTranslation();

  const [open, { toggle }] = useDisclosure();

  const color =
    {
      pending: "yellow",
      active: "red",
      denied: "gray",
      resolved: "green",
    }[props.alert.stage] || "primary";

  const typeIcon: Record<FallType, LucideIcon> = {
    manual: Megaphone,
    impact: Hammer,
    fall: ShieldAlert,
    inactivity: ClockAlert,
  };

  const statusIcon: Record<FallStage, LucideIcon> = {
    pending: Hourglass,
    active: typeIcon[props.alert.type],
    denied: Ban,
    resolved: Check,
  };

  return (
    <Alert
      color={color}
      //   title={`${t("alert." + props.alert.stage)} - ${t(
      //     "alert." + props.alert.type
      //   )}`}
      icon={React.createElement(statusIcon[props.alert.stage], {
        size: 20,
      })}
      mb="sm"
    >
      <Group justify={"space-between"} align={"center"}>
        <Title c={color} order={6}>
          {t("alert." + props.alert.stage)} - {t("alert." + props.alert.type)}
        </Title>

        <Group gap={0} align={"center"}>
          <Text ta={"right"} mx={"xs"} size="xs" c={"dimmed"}>
            {time}
          </Text>
          <ActionIcon variant="light" color={color} onClick={toggle}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </ActionIcon>
        </Group>
      </Group>

      <Collapse in={open} mt="md">
        <Map
          unstyled
          id={"test"}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <UserMarker
            name={undefined}
            color={color}
            icon={typeIcon[props.alert.type]}
            position={{
              lat: props.alert.latitude,
              lng: props.alert.longitude,
            }}
          />
        </Map>

        <Stack mt={"xs"} gap={0}>
          <Text>
            Status:{" "}
            <Badge color={color}>{t("alert." + props.alert.stage)}</Badge>
          </Text>

          {/* <Text>
          Lat/Lng: {props.alert.latitude.toString()},{" "}
          {props.alert.longitude.toString()}
          </Text> */}
          <Text size="xs" mt={"xs"}>
            {t("alert.message", { type: t("alert." + props.alert.type) })}
          </Text>
        </Stack>

        <Box>
          <ContactCard
            key={props.alert.uid}
            name={relative?.name}
            phone={
              parsePhoneNumberFromString(relative?.phone ?? "")
                ?.number as E164Number
            }
          />
        </Box>
      </Collapse>

      <ButtonGroup mt={"xs"}>
        <Button
          component="a"
          href={`https://maps.apple.com/?ll=${props.alert.latitude},${
            props.alert.longitude
          }&q=${
            relative?.name ? `Alert from ${relative.name}` : "Alert location"
          }`}
          color={color}
          flex={1}
          rightSection={<MapPin size={16} />}
        >
          {t("misc.open_map")}
        </Button>

        <Button
          variant={"light"}
          disabled={!relative}
          component="a"
          href={`tel:${relative?.phone}`}
          color={color}
          flex={1}
          rightSection={<Phone size={16} />}
        >
          {t("misc.call")}
        </Button>
      </ButtonGroup>
    </Alert>
  );
}
