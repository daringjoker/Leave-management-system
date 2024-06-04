import { db } from "../db";

export async function getAllRoles() {
  return await db
    .select({
      id: "id",
      name: "name",
    })
    .from("role");
}
