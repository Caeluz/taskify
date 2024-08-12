import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import * as taskController from "../controllers/Sutando/TaskController";
import { validateData } from "../middleware/validatorMiddleware";
import { createProjectTaskSchema } from "../schemas/ProjectTaskSchema";

const taskRouter = express.Router();

taskRouter.use("/", authenticateToken);
taskRouter
  .get("/projects/:projectId/tasks", taskController.getProjectTasks)
  .post(
    "/projects/:projectId/tasks",
    validateData(createProjectTaskSchema),
    taskController.createProjectTask
  );

export default taskRouter;
