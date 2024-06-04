import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new leave Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("leave", (table: TableBuilder) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
    table.integer("leave_type_id").unsigned().notNullable();
    table.foreign("leave_type_id").references("id").inTable("leave_type");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.integer("duration").notNullable();
    table.string("reason").notNullable();
    table.string("status").notNullable();
    table.integer("approved_by").unsigned();
    table.foreign("approved_by").references("id").inTable("user");
    table.string("manager_comment");
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the leave Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("leave");
}
