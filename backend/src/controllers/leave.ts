import { Request, Response } from "express";
import {
  getAllLeaves,
  getLeaveById,
  getAllLeaveForUser,
  createLeave,
  setToApproved,
  setToRejected,
} from "../models/leave";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { sendArrayResponse } from "./common";
import { LeaveApplication } from "../validators/leave";
import { addLeaveBalance, reduceLeaveBalance } from "../models/leaveBalance";

export async function getLeaves(req: Request, res: Response) {
  const leaves = await getAllLeaves();
  return sendArrayResponse(res, leaves);
}

export async function getSingleLeave(req: Request, res: Response) {
  const leaveId = parseInt(req.params.id);
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    return res.status(404).send({ msg: "Leave not found" });
  }
  return res.status(200).send(leave);
}

export async function getLeavesForUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const leaves = await getAllLeaveForUser(userId);
  return sendArrayResponse(res, leaves);
}

export async function getLeavesForSelf(
  req: AutheniticatedRequest,
  res: Response,
) {
  const { authUser } = req.body;
  const leaves = await getAllLeaveForUser(authUser.id);
  return sendArrayResponse(res, leaves);
}

export async function applyLeave(
  req: AutheniticatedRequest<LeaveApplication>,
  res: Response,
) {
  const { authUser, data } = req.body;
  const payload = { ...data, userId: authUser.id };
  const adjustedLeaveBalance = await reduceLeaveBalance(payload);

  if (!adjustedLeaveBalance) {
    return res.status(400).send({ msg: "Insufficient leave balance" });
  }

  const leave = await createLeave(payload);

  return res.status(201).send(leave);
}

export async function approveLeave(req: AutheniticatedRequest, res: Response) {
  const { id: leaveId } = req.params;
  const { authUser } = req.body;
  const leave = await getLeaveById(parseInt(leaveId));
  if (!leave) {
    return res.status(404).send({ msg: "Leave not found" });
  }
  if (leave.status.toLowerCase() !== "pending") {
    return res.status(400).send({ msg: "Leave has already been decided upon" });
  }

  if (authUser.id !== leave.managerId) {
    return res
      .status(403)
      .send({ msg: "You are not authorized to approve this leave" });
  }
  const approved = await setToApproved(parseInt(leaveId), authUser.id);

  return res.status(200).send({ approved });
}

export async function rejectLeave(req: AutheniticatedRequest, res: Response) {
  const { id: leaveId } = req.params;
  const { authUser } = req.body;
  const leave = await getLeaveById(parseInt(leaveId));
  if (!leave) {
    return res.status(404).send({ msg: "Leave not found" });
  }

  if (leave.status.toLowerCase() !== "pending") {
    return res.status(400).send({ msg: "Leave has already been decided upon" });
  }

  if (authUser.id !== leave.managerId) {
    return res
      .status(403)
      .send({ msg: "You are not authorized to reject this leave" });
  }

  const rejected = await setToRejected(parseInt(leaveId), authUser.id);
  const increased = await addLeaveBalance(leave);
  console.log("rejected", rejected);

  return res.status(200).send({ rejected });
}
