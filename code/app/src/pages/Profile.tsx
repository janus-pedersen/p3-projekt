import { Button, Stack, Text } from "@mantine/core";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

export function ProfilePage() {
  const { user, signOut } = useAuth();

  return (
    <Stack>
      <UserAvatar />
      <Text>{user?.displayName}</Text>
      <Text>{user?.phoneNumber}</Text>
      <Button rightSection={<LogOut />} onClick={signOut}>
        Sign Out
      </Button>
    </Stack>
  );
}
