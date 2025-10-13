import { Avatar } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";

export interface UserAvatarProps {
  active?: boolean;
}

export function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      name={user?.displayName ?? "Janus Pedersen"}
      alt="User Avatar"
      variant={"light"}
      color={props.active ? "primary" : "gray"}
    />
  );
}
