import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new role Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("role", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.string("description");
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the role Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("role");
}
