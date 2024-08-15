import { sutando, Model } from "sutando";
import { Project } from "./Project";
import { TaskMember } from "./TaskMember";
import { ProjectMember } from "./ProjectMember";

export class Task extends Model {
  table = "tasks";
  primaryKey = "id";

  id!: number;
  project_id!: number;
  name!: string;
  description!: string;
  priority!: string;
  status!: string;
  // Members
  start_date!: string;
  due_date!: string;
  created_at!: string;
  updated_at!: string;


  projectMembers!: ProjectMember[];
  project!: Project;

  relationProject() {
    return this.belongsTo(Project, "project_id", "id");
  }

  // Many to many
  relationProjectMembers() {
    return this.belongsToMany(
      ProjectMember,
      "task_members",
      "task_id",
      "project_member_id"
    );
  }

  // relationTaskMembers() {
  //   return this.hasMany(TaskMember);
  // }
}
