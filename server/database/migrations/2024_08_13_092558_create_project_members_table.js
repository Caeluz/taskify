const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("project_members", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects");
      table.string("role");

      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("project_members");
  }
};
