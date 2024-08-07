import exp from "constants";
import express from "express";
const { Pool } = require("pg");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require("cors");
const PORT = 8081;

// Postgre SQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin123",
});

export { pool };

// Users
const usersRouter = require("./src/routes/UserRoutes");
// import usersRouter from "./src/users/routes";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.get("/", async (req, res) => {
  if (pool) {
    console.log("Connected to the database");
  }
});

app.use("/api/users", usersRouter);

app.get("/api/home", (req, res) => {
  res.json({
    message: "Hello World",
    people: [
      { id: 1, name: "test" },
      { id: 2, name: "2" },
    ],
  });
});

// app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
