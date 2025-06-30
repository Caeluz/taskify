import { authenticateToken } from "../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";
import * as projectSettingsController from "../controllers/Sutando/ProjectSettingsController";

const projectSettingsRouter = express.Router();

projectSettingsRouter.use("/projects", authenticateToken);
projectSettingsRouter.get(
  "/projects/:projectId/settings",
  projectSettingsController.getProjectSettings
);

export default projectSettingsRouter;
