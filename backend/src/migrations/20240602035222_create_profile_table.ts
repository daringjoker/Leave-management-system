import { Knex } from "knex";
import { TableBuilder } from "../types/knex";

/**
 * Create a new profile Table
 */
export async function up(db: Knex) {
  return await db.schema.createTable("profile", (table: TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("phone").notNullable();
    table.string("designation").notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.integer("country_id").unsigned().notNullable();
    table.foreign("country_id").references("country.id");
    table.integer("department_id").unsigned().notNullable();
    table.foreign("department_id").references("department.id");
    table.integer("manager_id").unsigned().nullable();
    table.foreign("manager_id").references("user.id");
    table.timestamps({ defaultToNow: true });
  });
}

/**
 * Drop the profile Table
 */
export async function down(db: Knex) {
  return await db.schema.dropTable("profile");
}
