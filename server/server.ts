// Import dependencies
import knex from "knex";
import express from "express";
import { pool } from "./database/PostgreDatabase";
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = 8081;

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Import and use routes
const usersRouter = require("./src/routes/UserRoutes");
const authRouter = require("./src/routes/AuthRoutes");
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Define routes
app.get("/", async (req, res) => {
  if (pool) {
    console.log("Connected to the database");
  }
});

app.get("/api/home", (req, res) => {
  res.json({
    message: "Hello World",
    people: [
      { id: 1, name: "test" },
      { id: 2, name: "2" },
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
