import { Request, Response } from "express";
import {
  AllowableQuery,
  createNewUser,
  getAllUsers,
  getUserById,
  search,
} from "../models/user";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { hashPassword } from "../services/encryption";

export function maskPrivateUserData(user: any) {
  function maskSingleUser(user: any) {
    const { password, ...publicData } = user;
    return publicData;
  }

  if (Array.isArray(user)) {
    return user.map(maskSingleUser);
  }
  return maskSingleUser(user);
}

export function getSelfUser(req: Request, res: Response) {
  const { authUser } = req.body;
  return res.status(200).send(maskPrivateUserData(authUser));
}

export async function getUsers(req: Request, res: Response) {
  const users = await getAllUsers();

  return res.status(200).send(maskPrivateUserData(users));
}

export async function getSingleUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  return res.status(200).send(maskPrivateUserData(user));
}

export async function searchUsers(req: Request, res: Response) {
  const { query } = req;
  console.log(query);
  const users = await search(query as AllowableQuery & { q: string });
  return res.status(200).send(maskPrivateUserData(users));
}

export async function createUser(req: AutheniticatedRequest, res: Response) {
  const { data } = req.body;
  const { password } = data;
  const hashedPassword = hashPassword(password);
  const user = await createNewUser(data, hashedPassword);
  return res.status(201).send(maskPrivateUserData(user));
}
