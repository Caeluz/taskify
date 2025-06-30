import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { User } from "../../models/User";
import { Project } from "../../models/Project";
import { sutandoConnection } from "../../../database/SutandoPGDatabase";
sutandoConnection;

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const Projects = await Project.query().all();

    res.json({ message: "Success", data: Projects });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get User's Projects
// Other team members can also look at the projects
export const getUserProjects = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    // Show user projects, also other members can look at the project
    const userProjects = await Project.query()
      // .where("user_id", userId)
      .WhereHas("project_members", (query: any) => {
        query.where("user_id", userId);
      })
      .all();

    // const userProjects = await Project.query().where("user_id", userId).get();

    return res.status(200).json({
      message: "Successfully fetched user projects",
      data: userProjects,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { user_id, name, description } = req.body;

  try {
    const user = await User.query().create({
      name,
      description,
      user_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get User's Project
// Other team members can also look at the project
export const getUserProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.params;

  try {
    // Show user project, also other members can look at the project
    const userProject = await Project.query()
      // .orWhere("user_id", userId)
      .WhereHas("project_members", (query: any) => {
        query.where("user_id", userId);
      })
      .find(projectId);

    if (!userProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userProjectData = {
      id: userProject.id,
      name: userProject.name,
      description: userProject.description,
      status: userProject.status,
      progress: userProject.progress,
    };

    return res
      .status(200)
      .json({ message: "Success get", data: userProjectData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Create user's project
export const createUserProject = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  console.log(req.user);
  const {
    name,
    description,
    status,
  }: {
    name: string;
    description: string;
    status: string;
  } = req.body;

  try {
    const user = await User.query().find(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // that adds the authenticated user's ID to the request
    if (req.user?.id !== userId) {
      res
        .status(403)
        .json({ message: "Unauthorized to create project for this user" });
      return;
    }

    const project = await Project.query().create({
      name,
      description,
      status,
      user_id: userId,
    });

    // Add the admin role for the creator of the project
    project.relationProjectMembers().create({
      user_id: userId,
      role: "admin",
    });

    return res.status(201).json({ message: "Success", data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

// Update some details in user's project
export const updateUserProject = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const projectId = parseInt(req.params.projectId, 10);

  const {
    name,
    description,
    status,
  }: {
    name: string;
    description: string;
    status: string;
  } = req.body;

  try {
    const [user, project] = await Promise.all([
      User.query().find(userId),
      Project.query().find(projectId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found for this user" });
    }

    const update = await project.update({
      name: name,
      description: description,
      status: status,
    });

    return res.status(200).json({ message: "Success", data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

// Used for http://localhost:8080/projects/:id/settings
// PATCH: Partially update user's project
export const patchUserProject = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const projectId = parseInt(req.params.projectId, 10);

  // Only pick allowed fields from req.body
  const { name, description, status } = req.body;

  try {
    const [user, project] = await Promise.all([
      User.query().find(userId),
      Project.query().find(projectId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found for this user" });
    }

    // Only update fields that are provided
    const updateData: Partial<{
      name: string;
      description: string;
      status: string;
    }> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    await project.update(updateData);

    return res.status(200).json({ message: "Success", data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

// Delete user's project
export const deleteUserProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const userId = parseInt(req.params.userId, 10);
  try {
    const user = await User.query().find(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // that adds the authenticated user's ID to the request
    if (req.user?.id !== userId) {
      res
        .status(403)
        .json({ message: "Unauthorized to delete project for this user" });
      return;
    }

    // To not delete project that's not user

    // Only owner can delete
    const userProject = await Project.query()
      .where("user_id", userId)
      .where("id", projectId)
      .firstOrFail();
      

    await userProject.delete();

    return res
      .status(200)
      .json({ message: "User's Project successfully deleted" });
  } catch (error) {
    if (error instanceof ModelNotFoundError) {
      return res
        .status(404)
        .json({ message: "Project not found for this user" });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

