import { Response } from "express";
import {
  changePasswordSchema,
  loginSchema,
} from "../validators/authentication";
import { TypedRequest } from "../types/common";
import { getUserByUsername, updatePassword } from "../models/user";
import {
  SignAccessToken,
  comparePassword,
  hashPassword,
} from "../services/encryption";
import { AutheniticatedRequest } from "../middlewares/authentication";

const sendInvalidCredentials = (res: Response) => {
  return res.status(401).send({
    error: "Invalid username or password",
  });
};

const sendUnauthorized = (res: Response) => {
  return res.status(401).send({
    error: "Unauthorized",
  });
};

export async function login(
  req: TypedRequest<typeof loginSchema>,
  res: Response,
) {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  if (!user) {
    console.log("User not found");
    return sendInvalidCredentials(res);
  }

  if (!comparePassword(password, user.password)) {
    console.log("Invalid password");
    return sendInvalidCredentials(res);
  }

  const accessToken = await SignAccessToken(user);

  return res.status(200).send({
    accessToken,
  });
}

export async function changePassword(
  req: AutheniticatedRequest<typeof changePasswordSchema>,
  res: Response,
) {
  const { authUser, data } = req.body;
  const { oldPassword, newPassword } = data;

  if (!comparePassword(oldPassword, authUser.password)) {
    return res.status(401).send({
      error: "Invalid password",
    });
  }
  const hashedPassword = hashPassword(newPassword);
  await updatePassword(authUser.id, hashedPassword);

  return res.status(200).send({
    message: "Password changed successfully",
  });
}
