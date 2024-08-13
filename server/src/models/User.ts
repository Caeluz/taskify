import { sutando, Model } from "sutando";
import { Project } from "./Project";
import { ProjectMember } from "./ProjectMember";

export class User extends Model {
  table = "users";
  primaryKey = "id";
  protected timestamps: boolean = true;

  id!: number;
  username!: string;
  email!: string;
  password!: string;
  salt!: string;
  created_at!: Date;
  updated_at!: Date;

  relationProjects() {
    return this.hasMany(Project, "user_id", "id");
  }

  relationProjectMembers() {
    return this.hasMany(ProjectMember, "user_id", "id");
  }
}
