import { Router } from "express";
import { getDepartments } from "../controllers/departments";

export const departmentRouter = Router();

departmentRouter.get("/", getDepartments);
