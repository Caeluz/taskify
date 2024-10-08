import { User } from "./../../src/models/User";
import { sutando } from "sutando";

import { hashText } from "../../src/utils/HashText";

const userData = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "tester",
  },
];

const UserSeed = async () => {
  console.log("Starting user seeding...");
  for (let i of userData) {
    const { salt, hashedPassword } = hashText(i.password);
    const user = new User({
      username: i.username,
      password: hashedPassword,
      salt: salt,
    });
    await user.save();
  }
  console.log("User seeding completed.");
};

export default UserSeed;
