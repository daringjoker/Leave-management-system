import { Router } from "express";
import { changePassword, login } from "../controllers/auth";
import { validate } from "../middlewares/validator";
import {
  changePasswordSchema,
  loginSchema,
} from "../validators/authentication";
import { requireAuthentication } from "../middlewares/authentication";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), login);

authRouter.get(
  "/change-password",
  requireAuthentication,
  validate(changePasswordSchema),
  changePassword,
);
