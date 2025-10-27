import {
  ActionIcon,
  Center,
  Divider,
  Group,
  InputWrapper,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import { Edit2Icon, LogOut } from "lucide-react";
import { Dialog } from "@capacitor/dialog";
import { RouteContext, type AppMode } from "../contexts/Routes/RouteContext";
import { useContext } from "react";

export function ProfilePage() {
  const { user, signOut, updateUser } = useAuth();
  const { appMode, setAppMode } = useContext(RouteContext)!;

  return (
    <>
      <Group w={"100%"} justify={"space-between"} px={"sm"}>
        <ActionIcon size={"xl"} variant={"transparent"}>
          🇺🇸
        </ActionIcon>
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
        <Divider label="Settings" />

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
          label="Account Type"
          description="Switch between Relative and Responder accounts"
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
                  label: "Wearer",
                  value: "wearer",
                },
                {
                  label: "Responder",
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
