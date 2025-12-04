import {
  Stack,
  Title,
  Text,
  Group,
  type TitleOrder,
  type MantineSpacing,
} from "@mantine/core";
import { type ReactNode } from "react";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;

  order?: TitleOrder;
  margin?: MantineSpacing;
}

export function Header({
  title,
  subtitle,
  action,
  order,
  margin,
}: HeaderProps) {
  return (
    <Stack mb={margin ?? "xl"} gap={0}>
      <Group mt={margin ?? "xl"} justify={"space-between"} align={"center"}>
        <Title order={order ?? 1}>{title}</Title>
        {action ? action : null}
      </Group>
      {subtitle && <Text>{subtitle}</Text>}
    </Stack>
  );
}
