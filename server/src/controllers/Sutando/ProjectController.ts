import { sutando } from "sutando";
import { Request, Response } from "express";

import { User } from "../../models/User";
import { Project } from "../../models/Project";
import { sutandoConnection } from "../../../database/SutandoPGDatabase";
sutandoConnection;

export const getProjects = async (req: Request, res: Response) => {
  try {
    const Projects = await Project.query().all();

    res.json({ Projects });
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
        user_id
    })
   
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
