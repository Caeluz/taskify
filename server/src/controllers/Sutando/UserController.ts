import { sutando } from "sutando";

import { Request, Response } from "express";
// export const users = sutandoDB.table("users").get();
import { User } from "../../models/User"; // Use ES6 import syntax

import { sutandoConnection } from "../../../database/SutandoPGDatabase";
import { hashText } from "../../utils/HashText";

sutandoConnection;

const db = sutando.connection();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.query().all();

    res.json({ message: "Successfully retrieved users", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await User.query()
      .where("username", username)
      .orWhere("email", email)
      .first();

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { salt, hashedPassword } = hashText(password);

    const user = await User.query().create({
      username,
      email,
      password: hashedPassword,
      salt,
    });

    // const user = new User();
    // user.username = username;
    // user.email = email;
    // user.password = hashedPassword;
    // user.salt = salt;
    // await user.save();

    res.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.query().find(id);
    // get user with projects
    // const user = await User.query().with("projects").find(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const existingUser = await User.query()
      .where("username", username)
      .orWhere("email", email)
      .first();

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.query().find(id);
    user?.update({ username, email });

    res.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.query().find(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.delete();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
