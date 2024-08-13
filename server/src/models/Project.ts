import { sutando, Model } from "sutando";
import { User } from "./User";
import { Task } from "./Task";
import { ProjectMember } from "./ProjectMember";

export class Project extends Model {
  table = "projects";
  primaryKey = "id";

  id!: number;
  user_id!: number;
  name!: string;
  status!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;

  relationUser() {
    return this.belongsTo(User, "user_id", "id");
  }

  relationProjectMembers() {
    return this.hasMany(ProjectMember, "project_member_id", "id");
  }

  relationTasks() {
    return this.hasMany(Task, "project_id", "id");
  }
}
