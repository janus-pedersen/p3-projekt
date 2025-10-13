import { Avatar, type MantineSize } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";

export interface UserAvatarProps {
  active?: boolean;
  size?: MantineSize;
}

export function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      size={props.size}
      name={user?.displayName ?? undefined}
      alt="User Avatar"
      variant={"light"}
      color={props.active ? "primary" : "gray"}
    />
  );
}
