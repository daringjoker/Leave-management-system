import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
