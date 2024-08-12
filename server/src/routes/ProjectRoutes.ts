import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import { createUserProjectSchema } from "../schemas/UserProjectSchema";
import * as projectController from "../controllers/Sutando/ProjectController";

const projectRouter = express.Router();

// Project routes
projectRouter
  .get("/projects", authenticateToken, projectController.getProjects)
  .post("/", validateData(createUserSchema), projectController.createProject);

// User project routes
projectRouter.use("/users", authenticateToken);
projectRouter
  .get("/users/:userId/projects", projectController.getUserProjects)
  .post(
    "/users/:userId/projects",
    validateData(createUserProjectSchema),
    projectController.createUserProject
  )
  .delete("/users/:userId/projects/:projectId", projectController.deleteUserProject);

export default projectRouter;
