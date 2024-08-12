import { sutando, Model } from "sutando";
import { Project } from "./Project";

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

  relationProject() {
    return this.belongsTo(Project, "project_id", "id");
  }
}
