import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";
import { createUserProjectSchema } from "../schemas/UserProjectSchema";
import * as ProjectDashboardController from "../controllers/Sutando/ProjectDashboardController";

const projectDashboardRouter = express.Router();
projectDashboardRouter.use("/projects", authenticateToken);
// Project routes
projectDashboardRouter.get(
  "/projects/:projectId/overview",
  ProjectDashboardController.getOverview
);

export default projectDashboardRouter;
