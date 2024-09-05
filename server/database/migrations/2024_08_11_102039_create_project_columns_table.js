const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("project_columns", (table) => {
      table.increments("id");
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects");
      // table.string("name");
      table
        .integer("task_status_id")
        .unsigned()
        .references("id")
        .inTable("task_statuses");
      table.integer("position");
      table.timestamps();

      // Add unique constraint to ensure no duplicate task statuses per project
      table.unique(["project_id", "task_status_id"]);

      // position is unique per project
      // table.unique(["project_id", "position"]);
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("project_columns");
  }
};
