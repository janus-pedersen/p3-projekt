import { createContext, useContext } from "react";

export type LapsusDevice = {
  id: string;
  battery: number;

  disconnect(): Promise<void>;
};

export type LapsusAdvertisement = {
  id: string;
  name: string;
  rssi: number;

  connect(): Promise<LapsusDevice>;
};

export type DeviceState = "DISCONNECTED" | "CONNECTING" | "CONNECTED";

export type DeviceContextType = {
  device?: LapsusDevice;
  state: DeviceState;

  listen(update: (devices: LapsusAdvertisement[]) => void): () => void;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const useDevice = () => useContext(DeviceContext)!;
