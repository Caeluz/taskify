import { ProjectMember } from "./../../models/ProjectMember";
import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { User } from "../../models/User";
import { Project } from "../../models/Project";
import { sutandoConnection } from "../../../database/SutandoPGDatabase";
import { Task } from "../../models/Task";
sutandoConnection;

export const getOverview = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const project = await Project.query()
      .with("tasks")
      .withCount("tasks")
      .find(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const totalTasks = project.tasks_count || 0;

    const [completedTasks, inProgressTasks, overDueTasks] = await getTasks(
      projectId
    );

    const projectData = {
      tasks: {
        totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        overDue: overDueTasks,
      },
      projectProgress: project.progress,
      membersWorkload: {
        test: await getMembersWorkload(projectId),
      },
    };

    return res.status(200).json({ message: "Success", data: projectData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTasks = async (projectId: string) => {
  const completedTasksPromise = Task.query()
    .where("project_id", projectId)
    .where("status", "completed")
    .count();

  const inProgressTasksPromise = Task.query()
    .where("project_id", projectId)
    .where("status", "in-progress")
    .count();

  const overDueTasksPromise = Task.query()
    .where("project_id", projectId)
    .where("status", "!=", "completed")
    .where("due_date", "<", new Date())
    .count();

  const [completedTasks, inProgressTasks, overDueTasks] = await Promise.all([
    completedTasksPromise,
    inProgressTasksPromise,
    overDueTasksPromise,
  ]);

  return [completedTasks, inProgressTasks, overDueTasks];
};

const getMembersWorkload = async (projectId: string) => {
  const projectMembers = await ProjectMember.query()
    .where("project_id", projectId)
    .with("tasks")
    .get();

  const membersWorkload = projectMembers.map((member) => {
    const taskCountByStatus = member.tasks.reduce((acc: any, task: any) => {
      if (!acc[task.status]) {
        acc[task.status] = 0;
      }
      acc[task.status]++;
      return acc;
    }, {});

    return {
      memberId: member.id,
      taskCountByStatus,
    };
  });

  return membersWorkload;
};

const getTaskStatusDistribution = async (projectId: string) => {
  const task = await Task.query().where('project_id', projectId)
};
