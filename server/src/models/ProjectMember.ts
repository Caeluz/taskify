import { sutando, Model } from "sutando";
import { User } from "./User";
import { Task } from "./Task";
import { Project } from "./Project";
import { TaskMember } from "./TaskMember";

export class ProjectMember extends Model {
  table = "project_members";
  primaryKey = "id";

  id!: number;
  user_id!: number;
  project_id!: number;
  role!: string;
  created_at!: string;
  updated_at!: string;

  // Relationships - to fix typescript
  user!: User;

  relationUser() {
    return this.belongsTo(User, "user_id", "id");
  }

  relationProject() {
    return this.belongsTo(Project, "project_id", "id");
  }

  relationTaskMembers() {
    return this.hasMany(TaskMember);
  }

  // Many to many
  relationTasks() {
    return this.belongsToMany(Task);
  }
}
