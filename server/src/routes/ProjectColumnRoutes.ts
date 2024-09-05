import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";
import * as projectColumnController from "../controllers/Sutando/ProjectColumnController";
import {
  createProjectColumnSchema,
  updateProjectColumnPositionSchema,
  updateProjectColumnStatusSchema,
} from "../schemas/ProjectColumnSchema";

const projectColumnRouter = express.Router();
projectColumnRouter.use("/", authenticateToken);
// Project routes
projectColumnRouter
  .get(
    "/projects/:projectId/columns",
    projectColumnController.getProjectColumns
  )
  .post(
    "/projects/:projectId/columns",
    validateData(createProjectColumnSchema),
    projectColumnController.createProjectColumn
  )
  .put(
    "/projects/:projectId/columns/:projectColumnId/status",
    validateData(updateProjectColumnStatusSchema),
    projectColumnController.updateProjectColumnStatus
  )
  .put(
    "/projects/:projectId/columns/:projectColumnId/position",
    validateData(updateProjectColumnPositionSchema),
    projectColumnController.updateProjectColumnPosition
  );

export default projectColumnRouter;
