// import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";
import * as authController from "../controllers/AuthController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);

export default authRouter;
