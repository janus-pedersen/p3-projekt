import { Stack, Title, Text } from "@mantine/core";

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <Stack mb={"xl"} gap={0}>
      <Title order={1} mt={"xl"}>
        {title}
      </Title>
      {subtitle && <Text>{subtitle}</Text>}
    </Stack>
  );
}
