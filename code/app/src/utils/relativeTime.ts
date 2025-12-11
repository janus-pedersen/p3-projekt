/**
 * Formats time in a relative time format (eg. 35 seconds ago )
 * @param to The target time
 */
export function relativeTime(to: Date, locale: Intl.LocalesArgument = "en") {
  console.log("Relative time", to);

  const now = new Date();
  const format = new Intl.RelativeTimeFormat(locale, { style: "short" });

  const seconds = Math.floor(to.getTime() / 1000) - now.getTime() / 1000;

  if (!isFinite(seconds) || isNaN(seconds)) return "";

  if (Math.abs(seconds) < 2) return "just now";
  if (Math.abs(seconds) < 60)
    return format.format(Math.floor(seconds), "second");

  const minutes = seconds / 60;
  if (Math.abs(minutes) < 60)
    return format.format(Math.floor(minutes), "minute");

  const hours = minutes / 60;
  if (Math.abs(hours) < 24) return format.format(Math.floor(hours), "hour");

  const days = hours / 24;
  if (Math.abs(days) < 7) return format.format(Math.floor(days), "day");

  const weeks = days / 7;
  if (Math.abs(weeks) < 4) return format.format(Math.floor(weeks), "week");

  const months = weeks / 4;
  if (Math.abs(months) < 12) return format.format(Math.floor(months), "month");

  return format.format(Math.floor(months) / 12, "year");
}
