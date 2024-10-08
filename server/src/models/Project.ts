import { sutando, Model } from "sutando";
import { User } from "./User";
import { Task } from "./Task";
import { ProjectMember } from "./ProjectMember";
import { ProjectColumn } from "./ProjectColumn";

export class Project extends Model {
  table = "projects";
  primaryKey = "id";

  id!: number;
  user_id!: number;
  name!: string;
  status!: string;
  progress!: number;
  description!: string;
  created_at!: string;
  updated_at!: string;

  // Others
  tasks_count!: string;

  // Relation
  tasks!: Task[];

  relationUser() {
    return this.belongsTo(User, "user_id", "id");
  }

  relationProjectColumns() {
    return this.hasMany(ProjectColumn, "project_id", "id");
  }

  relationProjectMembers() {
    return this.hasMany(ProjectMember, "project_member_id", "id");
  }

  relationTasks() {
    return this.hasMany(Task, "project_id", "id");
  }
}
