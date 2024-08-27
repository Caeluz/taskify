import { sutando } from "sutando";
import { TaskStatus } from "../../src/models/TaskStatus";

const date = new Date();
const dateOne = new Date(date);
dateOne.setDate(date.getDate() + 1);

const taskStatusData = [
  {
    id: 1,
    name: "ToDo",
    hex_color: "#FF0000",
  },
  {
    id: 2,
    name: "InProgress",
    hex_color: "#00FF00",
  },
  {
    id: 3,
    name: "Done",
    hex_color: "#0000FF",
  },
];

const TaskStatusSeed = async () => {
  console.log("Starting task status seeding...");
  for (let i of taskStatusData) {
    const taskStatus = new TaskStatus({
      id: i.id,
      name: i.name,
      hex_color: i.hex_color,
      // created_at: date,
      // updated_at: date,
    });
    await taskStatus.save();
  }
  console.log("Task status seeding completed.");
};

export default TaskStatusSeed;
