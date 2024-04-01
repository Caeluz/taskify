require("dotenv").config();

// const { Client } = require("pg");

// const client = new Client({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "your_default_password",
//   database: process.env.DB_NAME || "your_default_database",
// });

// client.connect();
// client.query("SELECT * FROM users", (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(res.rows);
//   client.end();
// });

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "your_default_password",
    database: process.env.DB_NAME || "your_default_database",
  },
  searchPath: ["knex", "public"],
});

// knex
//   .select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default knex;
