import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new country_leave_credit Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable(
    "country_leave_credit",
    (table: TableBuilder) => {
      table.increments("id").primary();
      table.integer("country_id").unsigned().notNullable();
      table.foreign("country_id").references("id").inTable("country");
      table.integer("leave_type_id").unsigned().notNullable();
      table.foreign("leave_type_id").references("id").inTable("leave_type");
      table.integer("credit").notNullable();
      table.timestamps({ defaultToNow: true });
    },
  );
}

/**
 * Drop the country_leave_credit Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("country_leave_credit");
}
