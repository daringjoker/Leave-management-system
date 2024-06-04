import { z } from "zod";

export const leaveApplicationSchema = z.object({
  leaveTypeId: z.number().int().nonnegative(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  reason: z.string(),
});

export type LeaveApplication = z.infer<typeof leaveApplicationSchema> & {
  userId: number;
};
