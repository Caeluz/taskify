import { ProjectMember } from "./../../models/ProjectMember";
import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { sutandoConnection } from "../../../database/SutandoPGDatabase";
import { Project } from "../../models/Project";
import { User } from "../../models/User";
sutandoConnection;

export const getProjectMembers = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projectMembers = await ProjectMember.query()
      .where("project_id", projectId)
      .with(["user", "project"])
      .get();

    const data = projectMembers.map((projectMember: any) => {
      return {
        id: projectMember.id,
        username: projectMember?.user.username,
        avatar: projectMember?.user.avatar,
        role: projectMember?.role,
      };
    });

    return res.status(200).json({
      message: "Successfully retrieved project members",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProjectMember = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;
  try {
    // Check if the user is already a member of the project
    const existingMember = await ProjectMember.query()
      .where({ project_id: projectId, user_id: userId })
      .first();

    if (existingMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of this project" });
    }

    // Create the new project member
    const projectMember = await ProjectMember.query().create({
      project_id: projectId,
      user_id: userId,
      role: role,
    });

    return res
      .status(201)
      .json({ message: "Successfully created project member" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProjectMember = async (req: Request, res: Response) => {
  const { projectId, memberId } = req.params;
  try {
    const projectMember = await ProjectMember.query()
      .where("project_id", projectId)
      .with(["user", "project"])
      .find(memberId);

    if (!projectMember) {
      return res.status(404).json({ message: "Project member not found" });
    }

    const projectMemberData = {
      username: projectMember.user.username,
      avatar: projectMember?.user.avatar,
      role: projectMember.role,
    };

    return res.status(200).json({
      message: "Successfully retrieved project member",
      data: projectMemberData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProjectMember = async (req: Request, res: Response) => {
  const { role } = req.body;
  const { projectId, memberId } = req.params;
  try {
    const projectMember = await ProjectMember.query()
      .where("project_id", projectId)
      .find(memberId);

    if (!projectMember) {
      return res.status(404).json({ message: "Project member not found" });
    }

    projectMember.update({
      role: role,
    });

    return res
      .status(200)
      .json({ message: "Successfully update project member" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProjectMember = async (req: Request, res: Response) => {
  const { projectId, memberId } = req.params;
  try {
    const projectMember = await ProjectMember.query()
      .where("project_id", projectId)
      .find(memberId);

    projectMember?.delete();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
