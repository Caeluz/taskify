const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("task_statuses", (table) => {
      table.increments("id");
      table.string("name");
      table.string("hex_color", 9);
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("task_statuses");
  }
};
