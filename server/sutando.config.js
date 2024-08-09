// Update with your config settings.
require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    table: "sutando_migrations",
    path: "./database/migrations",
  },
  models: {
    path: "./src/models",
  },
};
