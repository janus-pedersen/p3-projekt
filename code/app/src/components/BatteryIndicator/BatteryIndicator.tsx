import {
  BatteryWarning,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
} from "lucide-react";

export interface BatteryIndicatorProps {
  level: number; // Battery level from 0 to 100
  size?: number;
}

export function BatteryIndicator(props: BatteryIndicatorProps) {
  const { level } = props;
  const size = props.size || 24;

  if (level >= 75) return <BatteryFull size={size} />;
  if (level >= 50) return <BatteryMedium size={size} />;
  if (level >= 20) return <BatteryLow size={size} />;
  return <BatteryWarning size={size} />;
}
