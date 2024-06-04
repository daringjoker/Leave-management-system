import { Router } from "express";
import {
  getLeaveBalanceForSelf,
  getLeaveBalanceForUser,
} from "../controllers/leaveBalance";
import { requireAuthentication } from "../middlewares/authentication";
import {
  createUser,
  getSelfUser,
  getSingleUser,
  getUsers,
  searchUsers,
} from "../controllers/user";
import {
  applyLeave,
  getLeavesForSelf,
  getLeavesForUser,
} from "../controllers/leave";
import { getHolidaysForSelf } from "../controllers/holiday";
import { validate } from "../middlewares/validator";
import { leaveApplicationSchema } from "../validators/leave";

export const userRouter = Router();
userRouter.use(requireAuthentication);

userRouter.get("/", getUsers);
userRouter.post("/", createUser);

userRouter.get("/search", searchUsers);

userRouter.get("/self", getSelfUser);
userRouter.get("/self/leaves", getLeavesForSelf);
userRouter.get("/self/holidays", getHolidaysForSelf);
userRouter.get("/self/leave-balance", getLeaveBalanceForSelf);
userRouter.post("/self/leaves", validate(leaveApplicationSchema), applyLeave);

userRouter.get("/:id", getSingleUser);
userRouter.get("/:id/leaves", getLeavesForUser);
userRouter.get("/:id/leave-balance", getLeaveBalanceForUser);
