import { validateData } from "../middleware/validatorMiddleware";
import { authenticateToken } from "../middleware/authMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";

const express = require("express");
const router = express.Router();
const controller = require("./../controllers/UserController");

const sutandoController = require("./../controllers/Sutando/UserController");

router
  // .get("/", authenticateToken, controller.getUsers)
  .get("/", sutandoController.getUsers)
  .post("/", validateData(createUserSchema), sutandoController.createUser)
  .get("/:id", sutandoController.getUserById)
  .put("/:id", validateData(updateUserSchema), sutandoController.updateUser)
  .delete("/:id", sutandoController.deleteUser);

module.exports = router;
