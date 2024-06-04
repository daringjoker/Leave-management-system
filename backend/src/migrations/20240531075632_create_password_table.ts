import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new passwords Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("password", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("password").notNullable();
    table.string("plain_text").nullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.boolean("is_active").defaultTo(true);
    table.boolean("is_temporary").defaultTo(true);
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the passwords Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("password");
}
