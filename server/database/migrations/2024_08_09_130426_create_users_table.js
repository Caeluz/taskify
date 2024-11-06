const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("avatar").nullable();
      table.string("email").unique();
      table.string("password");
      table.string("salt");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("users");
  }
};
