import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new leave_type Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("leave_type", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.boolean("is_common").notNullable().defaultTo(false);
    table.string("description");
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the leave_type Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("leave_type");
}
