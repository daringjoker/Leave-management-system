import { Response } from "express";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { getAllDepartments } from "../models/department";
import { sendArrayResponse } from "./common";

export async function getDepartments(
  req: AutheniticatedRequest,
  res: Response,
) {
  const departments = await getAllDepartments();
  return sendArrayResponse(res, departments);
}
