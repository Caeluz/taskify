require("dotenv").config();
import { sutando } from "sutando";

export const sutandoConnection = sutando.addConnection({
  client: "pg",
  version: "7.2",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
});

const sutandoDB = sutando.connection();

export default sutandoDB;

