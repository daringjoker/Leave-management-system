import { Router } from "express";
import { getCountries } from "../controllers/countries";

export const countryRouter = Router();

countryRouter.get("/", getCountries);
