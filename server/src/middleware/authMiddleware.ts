import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default"; // Use a strong secret key in a real application

// Function to generate a token
export function generateToken(user: any) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "7d",
  });
}

// Function to verify a token
export function verifyToken(token: any) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        console.error("Error verifying token:", err);
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

declare module "express-serve-static-core" {
  interface Request {
    // user?: {
    //   id: number | undefined | string;
    //   username: string;
    //   iat: number;
    //   exp: number;
    // };
    user?: any;
  }
}

export const authenticateToken = async (
  // req: Request & { user: any},
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    // res.sendStatus(403);
    // send error
    res.status(403).json({ error: error });
  }
};
