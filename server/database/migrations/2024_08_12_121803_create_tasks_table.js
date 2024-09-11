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
      table
        .integer("project_column_id")
        .unsigned()
        .references("id")
        .inTable("project_columns");
      table.string("description").nullable();
      table.enum("priority", ["low", "medium", "high"]);
      // table.string("status");
      table
        .integer("task_status_id")
        .unsigned()
        .references("id")
        .inTable("task_statuses");
      table.dateTime("start_date");
      table.dateTime("due_date").nullable();
      // table.dateTime("completed_at").nullable();
      table.integer("position");
      table.timestamps();

      // table.unique(["task_status_id", "position"]);
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("tasks");
  }
};
