import { Project } from "../../src/models/Project";

const projectData = [
  {
    name: "Test",
    user_id: 1,
    status: "Ongoing",
    description: "For testing purposes",
  },
];

const ProjectSeed = async () => {
  console.log("Starting Project seeding...");
  for (let i of projectData) {
    const project = new Project({
      name: i.name,
      user_id: i.user_id,
      status: i.status,
      description: i.description,
    });
    await project.save();
  }
  console.log("Project seeding completed.");
};


export default ProjectSeed;
