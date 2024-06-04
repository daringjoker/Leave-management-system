import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new country_holiday Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable(
    "country_holiday",
    (table: TableBuilder) => {
      table.increments("id").primary();
      table.integer("country_id").unsigned().notNullable();
      table.foreign("country_id").references("id").inTable("country");
      table.date("date").notNullable();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.timestamps({ defaultToNow: true });
    },
  );
}

/**
 * Drop the country_holiday Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("country_holiday");
}
