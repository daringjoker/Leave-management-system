import { Router } from "express";
import { requireAuthentication } from "../middlewares/authentication";
import {
  approveLeave,
  getLeaves,
  getSingleLeave,
  rejectLeave,
} from "../controllers/leave";

export const leaveRouter = Router();
leaveRouter.use(requireAuthentication);

leaveRouter.get("/", getLeaves);

leaveRouter.get("/:id", getSingleLeave);

leaveRouter.put("/:id/approve", approveLeave);
leaveRouter.put("/:id/reject", rejectLeave);
