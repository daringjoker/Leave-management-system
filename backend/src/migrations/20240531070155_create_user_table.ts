import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new user Table
 */
export async function up(knex: Knex) {
  return await knex.schema.createTable("user", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.integer("role_id").unsigned().notNullable();
    table
      .foreign("role_id")
      .references("id")
      .inTable("role")
      .onDelete("CASCADE");
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the user Table
 */
export async function down(knex: Knex) {
  return await knex.schema.dropTable("user");
}
