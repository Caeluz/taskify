import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { User } from "../../models/User";
import { Project } from "../../models/Project";
import { sutandoConnection } from "../../../database/SutandoPGDatabase";
sutandoConnection;

export const getProjects = async (req: Request, res: Response) => {
  try {
    const Projects = await Project.query().all();

    res.json({ message: "Success", data: Projects });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

// User's Projects
export const getUserProjects = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userProjects = await Project.query().where("user_id", userId).get();

    return res
      .status(200)
      .json({
        message: "Successfully fetched user projects",
        data: userProjects,
      });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getUserProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.params;

  try {
    const userProject = await Project.query()
      .where("user_id", userId)
      .find(projectId);

    if (!userProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userProjectData = {
      id: userProject.id,
      name: userProject.name,
    };

    return res.status(200).json({ message: "Success", data: userProjectData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

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

    const create = await Project.query().create({
      name,
      description,
      status,
      user_id: userId,
    });
    return res.status(201).json({ message: "Success", data: create });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

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
