import { useEffect, useState } from "react";
import { getFormattedTime } from "../utils/dateTime";
import { ValueOf } from "../types/common";

export const ACCURACY = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
} as const;

export type Accuracy = ValueOf<typeof ACCURACY>;

export function useTime(format: string, accuracy: Accuracy = ACCURACY.SECOND) {
  const updateMilliSeconds = accuracy;
  const [time, setTime] = useState(getFormattedTime(format));
  useEffect(() => {
    const currI = setInterval(() => {
      const newTime = getFormattedTime(format);
      if (newTime !== time) {
        setTime(newTime);
      }
    }, updateMilliSeconds);

    return () => {
      clearInterval(currI);
    };
  }, [format, updateMilliSeconds]);
  return time;
}
