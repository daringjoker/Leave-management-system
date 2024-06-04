import { Response } from "express";
import { AutheniticatedRequest } from "../middlewares/authentication";
import { sendArrayResponse } from "./common";
import { getHolidaysByCountry } from "../models/holiday";

export async function getHolidaysForSelf(
  req: AutheniticatedRequest,
  res: Response,
) {
  const authUser = req.body.authUser;
  const holidays = await getHolidaysByCountry(authUser.countryId);
  return sendArrayResponse(res, holidays);
}
