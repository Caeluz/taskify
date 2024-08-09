import { sutando, Model } from "sutando";
import { User } from "./User";

export class Project extends Model {
  table = "projects";
  primaryKey = "id";

  id!: number;
  user_id!: number;
  name!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;

  relationUser() {
    return this.belongsTo(User, "user_id", "id");
  }
}
