import { differenceInDays } from "date-fns";
import { db } from "../db";
import { LeaveApplication } from "../validators/leave";

function getLeaveQuery() {
  return db("leave")
    .leftJoin("leave_type", "leave.leave_type_id", "leave_type.id")
    .leftJoin("profile as approver", "leave.approved_by", "approver.user_id")
    .leftJoin("profile as user", "leave.user_id", "user.user_id")
    .select({
      id: "leave.id",
      userId: "leave.user_id",
      startDate: "leave.start_date",
      endDate: "leave.end_date",
      duration: "leave.duration",
      reason: "leave.reason",
      status: "leave.status",
      managerComment: "leave.manager_comment",
      leaveType: "leave_type.name",
      leaveTypeId: "leave_type.id",
      isCommon: "leave_type.is_common",
      approverName: "approver.name",
      approverDesignation: "approver.designation",
      approverId: "approver.id",
      managerId: "user.manager_id",
    })
    .orderBy("leave.created_at", "desc");
}

export async function getAllLeaveForUser(userId: number) {
  return await getLeaveQuery().where("leave.user_id", userId);
}

export async function getLeaveById(leaveId: number) {
  return await getLeaveQuery().where("leave.id", leaveId).first();
}

export async function getAllLeaves() {
  return await getLeaveQuery();
}

export async function createLeave(leave: LeaveApplication) {
  return await db("leave").insert({
    user_id: leave.userId,
    leave_type_id: leave.leaveTypeId,
    start_date: leave.startDate,
    end_date: leave.endDate,
    duration: differenceInDays(leave.endDate, leave.startDate) + 1,
    status: "PENDING",
    reason: leave.reason,
  });
}

export async function setToApproved(leaveId: number, approverId: number) {
  return await db("leave")
    .where({ id: leaveId })
    .update({ status: "APPROVED", approved_by: approverId });
}

export async function setToRejected(leaveId: number, approverId: number) {
  return await db("leave")
    .where({ id: leaveId })
    .update({ status: "REJECTED", approved_by: approverId });
}
