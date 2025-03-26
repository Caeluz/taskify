import { sutando } from "sutando";
import { Task } from "../../src/models/Task";

const date = new Date();
const dateOne = new Date(date);
dateOne.setDate(date.getDate() + 1);

const taskData = [
  {
    project_id: 1,
    project_column_id: 2,
    name: "API Development",
    description:
      "Develop RESTful APIs for user authentication and data management.",
    priority: "low",
    task_status_id: 2, // Id from task_statuses
    position: 1,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
  {
    project_id: 1,
    project_column_id: 3,
    name: "Frontend Integration",
    description: "Integrate React frontend with backend APIs.",
    priority: "high",
    task_status_id: 3,
    position: 1,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
  {
    project_id: 1,
    project_column_id: 1,
    name: "Database Design",
    description: "Design and implement the database schema for the project.",
    priority: "medium",
    task_status_id: 1,
    position: 1,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
  {
    project_id: 1,
    project_column_id: 2,
    name: "API Testing",
    description: "Write unit and integration tests for the APIs.",
    priority: "low",
    task_status_id: 2,
    position: 2,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
  {
    project_id: 1,
    project_column_id: 3,
    name: "UI Enhancements",
    description: "Improve the user interface for better user experience.",
    priority: "high",
    task_status_id: 3,
    position: 2,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
  {
    project_id: 1,
    project_column_id: 1,
    name: "Database Optimization",
    description: "Optimize database queries for better performance.",
    priority: "medium",
    task_status_id: 1,
    position: 2,
    start_date: date.toISOString(),
    due_date: dateOne.toISOString(),
  },
];

const TaskSeed = async () => {
  console.log("Starting task seeding...");
  for (let i of taskData) {
    const task = new Task({
      project_id: i.project_id,
      project_column_id: i.project_column_id,
      name: i.name,
      description: i.description,
      priority: i.priority,
      // status: i.status,
      position: i.position,
      task_status_id: i.task_status_id,
      start_date: i.start_date,
      due_date: i.due_date,
    });
    await task.save();
  }
  console.log("Task seeding completed.");
};

export default TaskSeed;
