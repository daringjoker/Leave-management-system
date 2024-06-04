import { addDays, format, formatDistance } from "date-fns";

export function greetingTime() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function getFormattedTime(formatString = "dd LLL yyyy, hh:mm b") {
  // HH:MM AM/PM
  return format(new Date(), formatString);
}

export function getFormattedDate(
  date: Date | string,
  formatString = "dd LLL yyyy",
) {
  return format(date, formatString);
}

export function getRemainingDuration(date: Date | string) {
  return formatDistance(new Date(), new Date(date));
}

export function getDurationInclusive(from: Date | string, to: Date | string) {
  return formatDistance(new Date(from), addDays(new Date(to), 1));
}
