import { MessageSquareWarning } from "lucide-react";
import { useAlerts } from "../../hooks/useAlerts";
import { Indicator } from "@mantine/core";

export function AlertIcon() {
  const { alerts } = useAlerts();

  const pending = alerts.find((alert) => alert.stage === "pending");
  const active = alerts.find((alert) => alert.stage === "active");

  const icon = <MessageSquareWarning />;

  if (active) {
    return (
      <Indicator processing color="red">
        {icon}
      </Indicator>
    );
  } else if (pending) {
    return <Indicator color="yellow">{icon}</Indicator>;
  } else return <MessageSquareWarning />;
}
