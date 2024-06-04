import { db } from "../db";

export async function getAllCountries() {
  return await db
    .select({
      id: "id",
      name: "name",
      code: "code",
    })
    .from("country");
}
