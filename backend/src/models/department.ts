import { db } from "../db";

export async function getAllDepartments() {
  return await db
    .select({
      id: "id",
      name: "name",
    })
    .from("department");
}
