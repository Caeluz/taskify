import { sutandoConnection } from "../../../database/SutandoPGDatabase";
sutandoConnection;

import { Request, Response } from "express";
import { User } from "../../models/User";
import { ProjectMember } from "./../../models/ProjectMember";

// Get users for project member dropdown, when adding a new member to a project
export const getUsersForDropdown = async (req: Request, res: Response) => {
  const { projectId } = req.query as { projectId: string };
  try {
    // Check if users are already in the project
    const projectMemberIds = await ProjectMember.query()
      .where("project_id", projectId)
      .pluck("id");

    // Then update the data to exclude users that are already in the project
    const users = await User.query()
      .whereNotIn("id", projectMemberIds.toArray())
      .get();

    const usersData = users.map((user: any) => {
      return {
        value: user.id,
        label: user.username,
      };
    });

    return res.status(200).json({
      message: "Successfully retrieved users for dropdown",
      data: usersData,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
