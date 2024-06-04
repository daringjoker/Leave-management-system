import { Request, Response } from "express";
import { getAllRoles } from "../models/role";
import { sendArrayResponse } from "./common";

export async function getRoles(req: Request, res: Response) {
  const roles = await getAllRoles();
  return sendArrayResponse(res, roles);
}
