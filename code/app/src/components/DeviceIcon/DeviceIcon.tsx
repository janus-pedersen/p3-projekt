import { Indicator } from "@mantine/core";
import { Watch } from "lucide-react";
import { useDevice } from "../../contexts/Device/DeviceContext";

export function DeviceIcon() {
  const { device } = useDevice();

  return (
    <Indicator processing color={device ? "green" : "red"}>
      <Watch size={24} />
    </Indicator>
  );
}
