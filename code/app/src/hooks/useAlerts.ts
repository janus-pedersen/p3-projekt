import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { useInterval, useSessionStorage } from "@mantine/hooks";
import { useMemo } from "react";
import type { FallAlert } from "../utils/alert";
import { useAuth } from "./useAuth";
import { useRelatives } from "./useRelatives";

export function useAlerts() {
  const { related } = useRelatives();

  const { user } = useAuth();
  const [raw, setRaw] = useSessionStorage<FallAlert[]>({
    defaultValue: [],
    key: `${user?.uid}_alerts`,
  });
  const alerts = useMemo(() => {
    return raw.map((alert) => ({
      ...alert,
      relative: related.find((r) => r.id === alert.uid)?.name || alert.uid,
    }));
  }, [raw, related]);

  useInterval(
    () => {
      if (!user) return;

      FirebaseFunctions.callByName({
        name: "alerts",
      })
        .then((result) => {
          const { alerts } = result.data as { alerts: FallAlert[] };
          if (!alerts) return;

          setRaw(alerts as FallAlert[]);
        })
        .catch((error) => {
          console.error("Error fetching alerts:", error);
        });
    },
    5000,
    { autoInvoke: true }
  );

  return { alerts };
}
