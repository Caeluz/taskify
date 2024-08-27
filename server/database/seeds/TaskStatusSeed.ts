import { sutando } from "sutando";
import { TaskStatus } from "../../src/models/TaskStatus";

const date = new Date();
const dateOne = new Date(date);
dateOne.setDate(date.getDate() + 1);

const taskStatusData = [
  {
    id: 1,
    name: "ToDo",
  },
  {
    id: 2,
    name: "InProgress",
  },
  {
    id: 3,
    name: "Done",
  },
];

const TaskStatusSeed = async () => {
  console.log("Starting task status seeding...");
  for (let i of taskStatusData) {
    const taskStatus = new TaskStatus({
      id: i.id,
      name: i.name,
      // created_at: date,
      // updated_at: date,
    });
    await taskStatus.save();
  }
  console.log("Task status seeding completed.");
};

export default TaskStatusSeed;
