import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new leave_balance Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("leave_balance", (table: TableBuilder) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
    table.integer("leave_type_id").unsigned().notNullable();
    table.foreign("leave_type_id").references("id").inTable("leave_type");
    table.integer("credit").notNullable();
    table.integer("balance").notNullable();
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the leave_balance Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("leave_balance");
}
