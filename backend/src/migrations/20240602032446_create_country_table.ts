import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new country Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("country", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("code").notNullable();
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the country Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("country");
}
