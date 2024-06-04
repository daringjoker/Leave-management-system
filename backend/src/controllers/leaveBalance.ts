import { Request, Response } from "express";
import { getLeaveBalanceByUserId } from "../models/leaveBalance";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { sendArrayResponse } from "./common";
import { db } from "../db";

export async function getLeaveBalanceForUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const leaveBalance = await getLeaveBalanceByUserId(userId);
  return res.status(200).send(leaveBalance);
}

export async function getLeaveBalanceForSelf(
  req: AutheniticatedRequest,
  res: Response,
) {
  const { authUser } = req.body;
  const leaveBalance = await getLeaveBalanceByUserId(authUser.id);
  return sendArrayResponse(res, leaveBalance);
}
