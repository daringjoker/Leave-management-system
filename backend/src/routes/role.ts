import { Router } from "express";
import { getRoles } from "../controllers/roles";

export const roleRouter = Router();

roleRouter.get("/", getRoles);
