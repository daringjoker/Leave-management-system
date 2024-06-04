import { db } from "../db";
import { Holiday } from "../types/holiday";

export async function getHolidaysByCountry(
  countryId: number,
): Promise<Holiday[]> {
  return await db
    .select({
      date: "date",
      name: "name",
      description: "description",
    })
    .from("country_holiday")
    .where("country_id", countryId);
}
