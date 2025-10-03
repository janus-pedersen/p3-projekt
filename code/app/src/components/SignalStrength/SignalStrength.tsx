import { SignalLow, SignalZero, SignalMedium, SignalHigh } from "lucide-react";

export default function SignalStrength(props: { rssi?: number }) {
  if (props.rssi === undefined) return null;
  if (props.rssi <= -100) return <SignalZero />;
  if (props.rssi <= -80) return <SignalLow />;
  if (props.rssi <= -60) return <SignalMedium />;
  return <SignalHigh />;
}
