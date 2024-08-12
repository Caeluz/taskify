const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("tasks", (table) => {
      table.increments("id");
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects");
      table.string("name");
      table.string("description").nullable();
      table.enum("priority", ["low", "medium", "high"]);
      table.string("status");
      table.dateTime("start_date");
      table.dateTime("due_date");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("tasks");
  }
};
