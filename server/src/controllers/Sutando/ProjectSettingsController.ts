import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";
import { Project } from "../../models/Project";

import { sutandoConnection } from "../../../database/SutandoPGDatabase";
sutandoConnection;

// User's Project Settings Show
export const getProjectSettings = async (req: Request, res: Response) => {
  const userId = parseInt(req.user.id, 10);
  const { projectId } = req.params;
  try {
    const userProject = await Project.query()
      .whereHas("project_members", (query: any) => {
        query.where("user_id", userId);
      })
      .find(projectId);

    // name, status, date, notifications
    const data = {
      name: userProject?.name,
      status: userProject?.status,
      projected_finish_date: "2024-01-02",
      link: "in-progress",
    };

    return res.json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};
