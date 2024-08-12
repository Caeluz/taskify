import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import * as taskController from "../controllers/Sutando/ProjectController";

const taskRouter = express.Router();

taskRouter.use("/", authenticateToken);
// taskRouter.get("/", taskController)
