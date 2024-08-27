import { sutando, Model } from "sutando";
import { Task } from "./Task";

export class TaskStatus extends Model {
  table = "task_statuses";
  primaryKey = "id";

  id!: number;
  name!: string;

  relationTasks() {
    return this.hasMany(Task, "status", "name");
  }
}
