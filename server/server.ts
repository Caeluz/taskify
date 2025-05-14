// Import dependencies
import knex from "knex";
import express from "express";
import { sutandoDB } from "./database/SutandoPGDatabase";
import { User } from "./src/models/User";
require("dotenv").config();
import { sutando } from "sutando";
import projectDashboardRouter from "./src/routes/ProjectDashboardRoutes";
// Import middleware
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
// const usersRouter = require("./src/routes/UserRoutes");
import usersRouter from "./src/routes/UserRoutes";
import authRouter from "./src/routes/AuthRoutes";
// const authRouter = require("./src/routes/AuthRoutes");
// const projectRouter = require("./src/routes/ProjectRoutes");
import projectRouter from "./src/routes/ProjectRoutes";
import taskRouter from "./src/routes/TaskRouter";
import projectMemberRouter from "./src/routes/ProjectMemberRoutes";
import projectColumnRouter from "./src/routes/ProjectColumnRoutes";
import dropdownDataRouter from "./src/routes/DropdownDataRoutes";

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api", projectRouter);
app.use("/api", taskRouter);
app.use("/api", projectMemberRouter);
app.use("/api", projectDashboardRouter);
app.use("/api", projectColumnRouter);
app.use("/api", dropdownDataRouter);

sutando.addConnection({
  client: "pg",
  version: "7.2",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
});

// Define routes
app.get("/api", async (req, res) => {
  const users = await User.query().all();

  res.json({ users });
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
