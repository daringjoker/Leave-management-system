import { NoneElement } from "../components/none";
import { ValueOf } from "../types/common";

export function requireAuthLevel(minAuthLevel: AuthLevel) {
  return function (target: Function) {
    const authLevel = syncAuthLevel();
    if (authLevel < minAuthLevel) {
      console.error(
        `Permission denied: required:${AuthLevelName[minAuthLevel]} >  your:${AuthLevelName[authLevel]}`,
      );
      return NoneElement;
    } else {
      return target;
    }
  };
}

export const AUTH_LEVEL = {
  ADMIN: 3,
  MANAGER: 2,
  EMPLOYEE: 1,
} as const;

export const AuthLevelName = Object.fromEntries(
  Object.entries(AUTH_LEVEL).map(([k, v]) => [v, k]),
);

type AuthLevel = ValueOf<typeof AUTH_LEVEL>;

export function syncAuthLevel(): AuthLevel {
  return AUTH_LEVEL.MANAGER;
}
