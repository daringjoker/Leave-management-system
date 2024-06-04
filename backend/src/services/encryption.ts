import { sign, verify } from "../utils/jwt";
import { config } from "../config";
import { User } from "../types/user";
import { compareSync, hashSync } from "bcrypt";

export async function SignAccessToken(user: User) {
  const payload = {
    userId: user.id,
    role: user.role,
  };
  const secret = new TextEncoder().encode(config.ACCESS_TOKEN_SECRET);

  return await sign(payload, secret);
}

export function verifyAccessToken(jwt: string) {
  const secret = new TextEncoder().encode(config.ACCESS_TOKEN_SECRET);
  return verify(jwt, secret);
}

export function hashPassword(password: string) {
  return hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return compareSync(password, hash);
}
