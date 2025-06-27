import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";
import { createUserProjectSchema, updateUserProjectSchema } from "../schemas/UserProjectSchema";
import * as projectController from "../controllers/Sutando/ProjectController";

const projectRouter = express.Router();
projectRouter.use("/", authenticateToken);
// Project routes
projectRouter.get("/projects", projectController.getProjects);
// .post("/", validateData(createUserSchema), projectController.createProject);

// User project routes
projectRouter
  .get("/users/:userId/projects", projectController.getUserProjects)
  .get("/users/:userId/projects/:projectId", projectController.getUserProject)
  .post(
    "/users/:userId/projects",
    validateData(createUserProjectSchema),
    projectController.createUserProject
  ).put("/users/:userId/projects/:projectId", validateData(updateUserProjectSchema), projectController.updateUserProject)
  .delete(
    "/users/:userId/projects/:projectId",
    projectController.deleteUserProject
  );

export default projectRouter;
