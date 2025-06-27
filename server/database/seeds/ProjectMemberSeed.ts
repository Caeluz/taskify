import { ProjectMember } from "../../src/models/ProjectMember";

const projectMemberData = [
  {
    user_id: 1,
    project_id: 1,
    role: "admin",
  },
  {
    user_id: 2,
    project_id: 1,
    role: "member"
  }
];

const ProjectMemberSeed = async () => {
  console.log("Starting project member seeding...");
  for (let i of projectMemberData) {
    const projectMember = new ProjectMember({
      user_id: i.user_id,
      project_id: i.project_id,
      role: i.role,
    });
    await projectMember.save();
  }
  console.log("Project member seeding completed.");
};

export default ProjectMemberSeed;
