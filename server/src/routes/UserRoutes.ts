import { validateData } from "../middleware/validatorMiddleware";
import { authenticateToken } from "../middleware/authMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import express from "express";
import * as userController from "../controllers/Sutando/UserController";

const userRouter = express.Router();
// const controller = require("./../controllers/UserController");

// const sutandoController = require("./../controllers/Sutando/UserController");

userRouter
  // .get("/", authenticateToken, controller.getUsers)
  .get("/", userController.getUsers)
  .post("/", validateData(createUserSchema), userController.createUser)
  .get("/:id", userController.getUserById)
  .put("/:id", validateData(updateUserSchema), userController.updateUser)
  .delete("/:id", userController.deleteUser);

export default userRouter;
