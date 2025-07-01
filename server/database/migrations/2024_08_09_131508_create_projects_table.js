const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("projects", (table) => {
      table.increments("id").primary();
      // table.integer("user_id");
      table.string("name");
      table.string("description");
      // Status must be enum
      // table.string("status");
      table
        .enum("status", ["active", "archived", "completed"])
        .defaultTo("active");
      table.decimal("progress", 5, 2).default(0);
      table.date("estimated_finish_date").nullable();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("projects");
  }
};
