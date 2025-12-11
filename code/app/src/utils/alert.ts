export type FallType = "fall" | "impact" | "inactivity" | "manual";

export type FallStage = "pending" | "active" | "resolved" | "denied";

export interface FallAlert {
  id: string;
  uid: string;
  latitude: number;
  longitude: number;
  stage: FallStage;
  type: FallType;
  createdAt: { _nanoseconds: number; _seconds: number };
}
