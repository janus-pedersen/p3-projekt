import { useState } from "react";
import {
  DeviceContext,
  type LapsusDevice,
  type DeviceContextType,
  type LapsusAdvertisement,
} from "./DeviceContext";

export function DeviceProvider(props: React.PropsWithChildren) {
  const [device] = useState<LapsusDevice | undefined>();
  const [state] = useState<DeviceContextType["state"]>("DISCONNECTED");

  const listen = (update: (devices: LapsusAdvertisement[]) => void) => {
    update([]);

    return () => {};
  };

  return (
    <DeviceContext.Provider
      value={{
        device,
        state,
        listen,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
}
