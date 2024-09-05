import { ProjectColumn } from "../../src/models/ProjectColumn";

const projectColumnData = [
  {
    project_id: 1,
    task_status_id: 1, // ToDo
    position: 1,
  },
  {
    project_id: 1,
    task_status_id: 2, // InProgress
    position: 2,
  },
  {
    project_id: 1,
    task_status_id: 3, // Done
    position: 3,
  },
];

const ProjectColumnSeed = async () => {
  console.log("Starting project column seeding...");
  for (let i of projectColumnData) {
    const projectColumn = new ProjectColumn({
      project_id: i.project_id,
      task_status_id: i.task_status_id,
      position: i.position,
    });
    await projectColumn.save();
  }
  console.log("Project column seeding completed.");
};

export default ProjectColumnSeed;
