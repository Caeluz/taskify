import { sutando, Model } from "sutando";
import { Task } from "./Task";

export class TaskStatus extends Model {
  table = "task_statuses";
  primaryKey = "id";
  hidden = ["created_at", "updated_at"];

  id!: number;
  hex_color!: string;
  name!: string;

  relationTasks() {
    return this.hasMany(Task);
  }
}
