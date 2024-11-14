import express from "express";
import { authenticateToken } from "./../middleware/authMiddleware";
import * as dropdownDataController from "../controllers/Sutando/DropdownDataController";

const dropdownDataRouter = express.Router();
dropdownDataRouter.use("/", authenticateToken);

dropdownDataRouter.get(
  "/dropdown-data/users",
  dropdownDataController.getUsersForDropdown
);

export default dropdownDataRouter;
