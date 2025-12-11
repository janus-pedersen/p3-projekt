import {
  ActionIcon,
  Center,
  Divider,
  Group,
  InputWrapper,
  SegmentedControl,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import { ChevronDown, Edit2Icon, LogOut } from "lucide-react";
import { Dialog } from "@capacitor/dialog";
import { RouteContext, type AppMode } from "../contexts/Routes/RouteContext";
import { useContext } from "react";
import { locales } from "../i18n";
import { useTranslation } from "react-i18next";

export function ProfilePage() {
  const { user, signOut, updateUser } = useAuth();
  const { appMode, setAppMode } = useContext(RouteContext)!;

  const { t, i18n } = useTranslation();

  return (
    <>
      <Group w={"100%"} justify={"space-between"} px={"sm"}>
        <Select
          comboboxProps={{
            width: "max-content",
          }}
          searchable={false}
          rightSection={<ChevronDown size={14} />}
          autoComplete={"off"}
          value={i18n.language}
          data={Object.entries(locales).map(([key, meta]) => ({
            value: key,
            label: meta.emoji,
          }))}
          onChange={(val) => {
            if (val) i18n.changeLanguage(val);
          }}
          w={75}
        ></Select>
        <ActionIcon
          onClick={() => {
            signOut();
          }}
          color={"red"}
          size={"xl"}
          variant={"transparent"}
        >
          <LogOut size={18} />
        </ActionIcon>
      </Group>
      <Stack align={"center"} my={"xl"} py={"xl"} gap={0}>
        <UserAvatar size="xl" />
        <Group gap={"xs"} mt={"xl"} align="center">
          <Text c={!user?.displayName ? "dimmed" : undefined} size="xl">
            {user?.displayName ?? "No Name"}
          </Text>
          <ActionIcon
            onClick={() => {
              Dialog.prompt({
                title: "Edit Name",
                message: "Enter your new display name",
                okButtonTitle: "Save",
                cancelButtonTitle: "Cancel",
              }).then((result) => {
                if (result.cancelled || !result.value.length) return;
                updateUser({ displayName: result.value ?? "" });
              });
            }}
            variant={"transparent"}
            color={"gray"}
            size={"lg"}
          >
            <Edit2Icon size={16} />
          </ActionIcon>
        </Group>
        <Text ff={"monospace"} c={"dimmed"}>
          {user?.phoneNumber}
        </Text>
      </Stack>
      <Stack w={"100%"} px={"lg"} mt={"xl"}>
        <Divider label={t("misc.settings")} />

        {/* <InputWrapper
          label="Language"
          description="Select your preferred language"
        >
          <Select
            my={"xs"}
            value={"en-US"}
            data={[
              {
                value: "en-US",
                label: "🇺🇸 English",
              },
            ]}
          />
        </InputWrapper> */}

        <InputWrapper
          w={"100%"}
          label={t("misc.account_type")}
          description={t("misc.switch_account_type", {
            wearer: t("wearer"),
            guardian: t("guardian"),
          })}
        >
          <SegmentedControl
            my={"xs"}
            fullWidth
            onChange={(value) => {
              setAppMode(value as AppMode);
            }}
            value={appMode}
            data={
              [
                {
                  label: t("wearer"),
                  value: "wearer",
                },
                {
                  label: t("guardian"),
                  value: "guardian",
                },
              ] as { value: AppMode; label: string }[]
            }
          />
        </InputWrapper>

        <InputWrapper
          label={"Alert History"}
          description={"View your past alerts and notifications here."}
        >
          <Center h={"100px"}>
            <Text c={"dimmed"} size="xs">
              No alerts to show.
            </Text>
          </Center>
          {/* <Stack my={"xs"} mih={"xl"}>
            Alerts go here
          </Stack> */}
        </InputWrapper>
      </Stack>
    </>
  );
}
