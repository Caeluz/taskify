import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import * as taskController from "../controllers/Sutando/TaskController";
import { validateData } from "../middleware/validatorMiddleware";
import {
  createProjectTaskSchema,
  updateProjectTaskSchema,
  updateTaskStatusSchema,
} from "../schemas/ProjectTaskSchema";

const taskRouter = express.Router();

taskRouter.use("/", authenticateToken);
taskRouter
  .get("/projects/:projectId/tasks", taskController.getProjectTasks)
  .post(
    "/projects/:projectId/tasks",
    validateData(createProjectTaskSchema),
    taskController.createProjectTask
  )
  .get("/projects/:projectId/tasks/:taskId", taskController.getProjectTask)
  .put(
    "/projects/:projectId/tasks/:taskId",
    validateData(updateProjectTaskSchema),
    taskController.updateProjectTask
  )
  .delete(
    "/projects/:projectId/tasks/:taskId",
    taskController.deleteProjectTask
  )
  // Update task status
  .put(
    "/projects/:projectId/tasks/:taskId/status",
    validateData(updateTaskStatusSchema),
    taskController.updateTaskStatus
  )
  .put(
    "/projects/:projectId/tasks/:taskId/status-position",
    validateData(updateTaskStatusSchema),
    taskController.updateTaskStatusAndPosition
  );

export default taskRouter;
