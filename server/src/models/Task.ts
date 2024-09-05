import { sutando, Model } from "sutando";
import { Project } from "./Project";
import { TaskMember } from "./TaskMember";
import { ProjectMember } from "./ProjectMember";
import { TaskStatus } from "./TaskStatus";
import { ProjectColumn } from "./ProjectColumn";

export class Task extends Model {
  table = "tasks";
  primaryKey = "id";

  id!: number;
  project_id!: number;
  project_column_id!: number;
  name!: string;
  description!: string;
  priority!: string;
  // status!: string;
  task_status_id!: number;
  // Members
  start_date!: string;
  due_date!: string;
  position!: number;
  created_at!: string;
  updated_at!: string;

  project_members_count!: number | string;

  projectMembers!: ProjectMember[];
  project!: Project;
  taskStatus!: TaskStatus;
  // taskStatus!: TaskStatus;

  relationProject() {
    return this.belongsTo(Project, "project_id", "id");
  }

  relationProjectColumn() {
    return this.belongsTo(ProjectColumn, "project_column_id", "id");
  }

  relationTaskStatus() {
    return this.belongsTo(TaskStatus);
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
