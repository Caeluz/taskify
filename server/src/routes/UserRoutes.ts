import { validateData } from "../middleware/validatorMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";

const express = require("express");
const router = express.Router();
const controller = require("./../controllers/UserController");

router
  .get("/", controller.getUsers)
  .post("/", validateData(createUserSchema), controller.createUser)
  .get("/:id", controller.getUserById)
  .put("/:id", validateData(updateUserSchema), controller.updateUser)
  .delete("/:id", controller.deleteUser);

module.exports = router;
