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
      table.string("status");
      table.decimal("progress", 5, 2).default(0);
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
