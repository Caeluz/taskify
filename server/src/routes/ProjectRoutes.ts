import { validateData } from "../middleware/validatorMiddleware";
import { authenticateToken } from "../middleware/authMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";

const express = require("express");
const router = express.Router();
const controller = require("./../controllers/Sutando/ProjectController");

router
  // .get("/", authenticateToken, controller.getUsers)
  .get("/", controller.getProjects)
  .post("/", validateData(createUserSchema), controller.createProject);
// .post("/", validateData(createUserSchema), sutandoController.createUser)
// .get("/:id", controller.getUserById)
// .put("/:id", validateData(updateUserSchema), controller.updateUser)
// .delete("/:id", controller.deleteUser);

module.exports = router;
