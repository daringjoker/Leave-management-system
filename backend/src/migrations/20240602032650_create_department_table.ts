import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new department Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("department", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the department Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("department");
}
