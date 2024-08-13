import {
  createProjectMemberSchema,
  updateProjectMemberSchema,
} from "./../schemas/ProjectMemberSchema";
import { authenticateToken } from "./../middleware/authMiddleware";
import express from "express";
import { validateData } from "../middleware/validatorMiddleware";

import * as projectMemberController from "../controllers/Sutando/ProjectMemberController";

const projectMemberRouter = express.Router();

// Project routes

// User project routes
projectMemberRouter.use("/projects", authenticateToken);
projectMemberRouter
  .get(
    "/projects/:projectId/members",
    projectMemberController.getProjectMembers
  )
  .post(
    "/projects/:projectId/members",
    validateData(createProjectMemberSchema),
    projectMemberController.createProjectMember
  )
  .get(
    "/projects/:projectId/members/:memberId",
    projectMemberController.getProjectMember
  )
  .put(
    "/projects/:projectId/members/:memberId",
    validateData(updateProjectMemberSchema),
    projectMemberController.updateProjectMember
  )
  .delete(
    "/projects/:projectId/members/:memberId",
    projectMemberController.deleteProjectMember
  );

export default projectMemberRouter;
