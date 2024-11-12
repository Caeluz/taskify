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
      .with(["user", "project", "tasks", "tasks.taskStatus"])
      .withCount("tasks as task_count")
      .get();

    const data = projectMembers.map((projectMember: any) => {
      // Group tasks by status
      const tasksByStatus = projectMember.tasks.reduce(
        (acc: any, task: any) => {
          const statusName = task.taskStatus.name;
          if (!acc[statusName]) {
            acc[statusName] = {
              count: 0,
              color: task.taskStatus.hex_color,
            };
          }
          acc[statusName].count += 1;
          return acc;
        },
        {}
      );

      return {
        id: projectMember.id,
        username: projectMember?.user.username,
        avatar: projectMember?.user.avatar,
        role: projectMember?.role,
        total_tasks: parseInt(projectMember.task_count),
        tasks_by_status: tasksByStatus,
      };
    });

    return res.status(200).json({
      message: "Successfully retrieved project members",
      data,
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

export const addMultipleProjectMembers = async (
  req: Request,
  res: Response
) => {
  const { projectId } = req.params;
  const { members } = req.body;
  try {
    // Check if the user is already a member of the project
    const existingMembers = await ProjectMember.query()
      .where("project_id", projectId)
      .whereIn(
        "user_id",
        members.map((member: any) => member.userId)
      )
      .get();

    if (existingMembers.count() > 0) {
      return res.status(400).json({
        error: "One or more users are already members of this project",
      });
    }

    // Check if the users exist
    const userIds = members.map((member: any) => member.userId);

    const users = await User.query().whereIn("id", userIds).get();

    if (users.count() !== userIds.length) {
      return res.status(400).json({ error: "One or more users do not exist" });
    }

    // Create the new project members
    const projectMembers = await ProjectMember.query().insert(
      members.map((member: any) => ({
        project_id: projectId,
        user_id: member.userId,
        role: member.role,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );

    return res.status(201).json({
      message: "Successfully added project members",
    });
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
