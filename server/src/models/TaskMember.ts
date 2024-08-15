import { sutando, Model } from "sutando";
import { Project } from "./Project";
import { ProjectMember } from "./ProjectMember";
import { Task } from "./Task";

export class TaskMember extends Model {
  table = "task_members";
  primaryKey = "id";

  task_id!: number;
  project_member_id!: number;

  // relationTasks() {
  //   // return this.belongsTo(Task);
  //   return this.belongsToMany(Task, "task_members");
  // }

  // relationProjectMember() {
  //   return this.belongsTo(ProjectMember);
  // }
}
