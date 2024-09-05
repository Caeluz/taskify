import { sutando, Model } from "sutando";
import { Project } from "./Project";
import { TaskStatus } from "./TaskStatus";
import { Task } from "./Task";

export class ProjectColumn extends Model {
  table = "project_columns";
  primaryKey = "id";

  project_id!: number;
  task_status_id!: number;
  position!: number;

  // change the position from string to number
  // casts = {
  //   position: "integer",
  // };

  relationProject() {
    return this.belongsTo(Project);
  }

  relationTasks() {
    return this.hasMany(Task, "project_column_id", "id");
  }

  relationTaskStatus() {
    return this.belongsTo(TaskStatus);
  }
}
