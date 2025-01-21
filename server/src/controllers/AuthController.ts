import { pool } from "../../database/PostgreDatabase";
import { Request, Response } from "express";
import { hashText } from "../utils/HashText";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET || "default";

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const { salt, password: storedHashedPassword } = user;

    const { hashedPassword } = hashText(password, salt);

    if (storedHashedPassword !== hashedPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Give token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "7d" }
    );

    // Return specified data
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    res
      .status(200)
      .json({ message: "Login successful", token, data: userResponse });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout
