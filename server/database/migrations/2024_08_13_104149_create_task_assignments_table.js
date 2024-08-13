const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("task_assignments", (table) => {
      table.increments("id");
      table.integer("task_id").unsigned().references("id").inTable("tasks");
      table
        .integer("project_members_id")
        .unsigned()
        .references("id")
        .inTable("project_members");

      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("task_assignments");
  }
};
