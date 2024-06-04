import { Response } from "express";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { getAllCountries } from "../models/country";
import { sendArrayResponse } from "./common";

export async function getCountries(req: AutheniticatedRequest, res: Response) {
  const countries = await getAllCountries();
  sendArrayResponse(res, countries);
}
