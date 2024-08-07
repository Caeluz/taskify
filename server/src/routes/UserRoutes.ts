const express = require("express");
const router = express.Router();
const controller = require("./../controllers/UserController");

router
  .get("/", controller.getUsers)
  .post("/", controller.createUser)
  .get("/:id", controller.getUserById)
  .put("/:id", controller.updateUser)
  .delete("/:id", controller.deleteUser);

module.exports = router;
