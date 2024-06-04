import { differenceInDays } from "date-fns";
import { db } from "../db";
import { LeaveApplication } from "../validators/leave";

export async function getLeaveBalanceByUserId(userId: number) {
  return await db("leave_balance")
    .leftJoin("leave_type", "leave_type_id", "leave_type.id")
    .select({
      leaveType: "leave_type.name",
      leaveTypeId: "leave_type.id",
      isCommonLeaveType: "leave_type.is_common",
      credit: "leave_balance.credit",
      balance: "leave_balance.balance",
    })
    .where("user_id", userId);
}

export async function updateLeaveBalance(
  userId: number,
  leaveTypeId: number,
  credit: number,
  balance: number,
) {
  return await db("leave_balance")
    .where({ user_id: userId, leave_type_id: leaveTypeId })
    .update({ credit, balance });
}

export async function reduceLeaveBalance(leaveApplication: LeaveApplication) {
  const { userId, leaveTypeId, startDate, endDate } = leaveApplication;
  const leaveBalance = await db("leave_balance")
    .select({
      leaveBalanceId: "id",
      credit: "credit",
      balance: "balance",
    })
    .where({
      user_id: userId,
      leave_type_id: leaveTypeId,
    })
    .first();

  const delta = differenceInDays(endDate, startDate) + 1;

  if (leaveBalance.balance < delta) {
    return null;
  }

  return await db("leave_balance")
    .update({
      balance: leaveBalance.balance - delta,
    })
    .where({ id: leaveBalance.leaveBalanceId });
}

export async function addLeaveBalance(leaveApplication: LeaveApplication) {
  const { userId, leaveTypeId, startDate, endDate } = leaveApplication;
  const leaveBalance = await db("leave_balance")
    .select({
      leaveBalanceId: "id",
      credit: "credit",
      balance: "balance",
    })
    .where({
      user_id: userId,
      leave_type_id: leaveTypeId,
    })
    .first();

  const delta = differenceInDays(endDate, startDate) + 1;

  return await db("leave_balance")
    .update({
      balance: leaveBalance.balance + delta,
    })
    .where({ id: leaveBalance.leaveBalanceId });
}
