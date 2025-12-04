export const TimeRange = {
  ONE_HOUR: 1000 * 60 * 60,
  SIX_HOURS: 1000 * 60 * 60 * 6,
  TWELVE_HOURS: 1000 * 60 * 60 * 12,
  ONE_DAY: 1000 * 60 * 60 * 24,
  THREE_DAYS: 1000 * 60 * 60 * 24 * 3,
  ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
} as const;

export type TimeRangeKey = keyof typeof TimeRange;
export type TimeRangeValue = (typeof TimeRange)[TimeRangeKey];
export const TimeRangeKeys: TimeRangeKey[] = Object.keys(
  TimeRange
) as TimeRangeKey[];
