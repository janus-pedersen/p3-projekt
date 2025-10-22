import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import { Edit2Icon, LogOut } from "lucide-react";
import { Dialog } from "@capacitor/dialog";

export function ProfilePage() {
  const { user, signOut, updateUser } = useAuth();

  return (
    <>
      <Group w={"100%"} justify={"flex-end"} px={"sm"}>
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
      <Stack align={"center"} mt={"xl"} pt={"xl"} gap={0}>
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
    </>
  );
}
