import db from "../../databasepg";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select("*").from("users");
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
