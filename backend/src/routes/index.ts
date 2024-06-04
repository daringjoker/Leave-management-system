import { Router } from "express";
import { statusRouter } from "./status";
import { authRouter } from "./authentication";
import { userRouter } from "./users";
import { leaveRouter } from "./leave";
import { countryRouter } from "./country";
import { departmentRouter } from "./department";
import { roleRouter } from "./role";

export const router = Router();

router.use(statusRouter);
router.use(authRouter);
router.use("/users", userRouter);
router.use("/leaves", leaveRouter);
router.use("/countries", countryRouter);
router.use("/departments", departmentRouter);
router.use("/roles", roleRouter);
