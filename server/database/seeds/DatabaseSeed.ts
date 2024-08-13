require("dotenv").config();
import { sutandoConnection } from "../SutandoPGDatabase";
import { sutando } from "sutando";

import ProjectSeed from "./ProjectSeed";
import TaskSeed from "./TaskSeed";
import UserSeed from "./UserSeed";
import ProjectMemberSeed from "./ProjectMemberSeed";

sutandoConnection;

const main = async () => {
  try {
    console.log("Start seeding...");
    // Seed
    await UserSeed();
    await ProjectSeed();
    await ProjectMemberSeed();
    await TaskSeed();

    console.log("Finish seeding...");

    sutando.destroyAll();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

main();
