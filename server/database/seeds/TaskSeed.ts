import { sutando } from "sutando";
import { Task } from "../../src/models/Task";

const date = new Date();
const dateOne = new Date(date);
dateOne.setDate(date.getDate() + 1);

const taskData = [
  {
    project_id: 1,
    name: "Web APIs",
    description: "Simple web Crud functionality",
    priority: "low",
    status: "ongoing",
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
];

const TaskSeed = async () => {
  console.log("Starting task seeding...");
  for (let i of taskData) {
    const task = new Task({
      project_id: i.project_id,
      name: i.name,
      description: i.description,
      priority: i.priority,
      status: i.status,
      start_date: i.start_date,
      due_date: i.due_date,
    });
    await task.save();
  }
  console.log("Task seeding completed.");
};

export default TaskSeed;
