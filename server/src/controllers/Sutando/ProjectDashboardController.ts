import { ProjectMember } from "./../../models/ProjectMember";
import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { User } from "../../models/User";
import { Project } from "../../models/Project";
import { sutandoConnection } from "../../../database/SutandoPGDatabase";
import { Task } from "../../models/Task";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { TaskMember } from "../../models/TaskMember";
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
      membersWorkload: await getMembersWorkload(projectId),
      taskStatusDistribution: await getTaskStatusDistribution(projectId),
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
  // Fetch project members with their tasks and user details
  const projectMembers = await ProjectMember.query()
    .where("project_id", projectId)
    .with("tasks", "user")
    .get();

  /*
    Unassigned
    1. Get all tasks for the project
    2. Filter tasks that have no projectMembers
    3. Count the tasks

    Tasks and projectMembers have a many-to-many relationship 
  */

  const allTasks = await Task.query()
    .where("project_id", projectId)
    .withCount("projectMembers")
    .get();

  const unassignedTasks = allTasks.filter(
    (task) => task.project_members_count == 0
  );

  const unassignedTaskCountByStatus = allTasks.reduce(
    (acc: any, task: Task) => {
      if (!acc[task.status]) {
        acc[task.status] = 0;
      }
      if (task.project_members_count === "0") {
        if (!acc["unassigned"]) {
          acc["unassigned"] = 0;
        }
        acc["unassigned"]++;
      }
      acc[task.status]++;
      return acc;
    },
    {}
  );

  // Just return the unassigned tasks count
  const unassignedTaskCount = allTasks.reduce((acc: any, task: Task) => {
    if (task.project_members_count === "0") {
      acc = 0;

      acc++;
    }

    return acc;
  }, {});

  // Calculate workload for each member
  const membersWorkload = projectMembers.map((member) => {
    let totalTaskCount = 0;
    const taskCountByStatus = member.tasks.reduce((acc: any, task: any) => {
      if (!acc[task.status]) {
        acc[task.status] = 0;
      }
      acc[task.status]++;
      totalTaskCount++;
      return acc;
    }, {});

    return {
      memberId: member.id,
      memberName: member.user?.username,
      taskCountByStatus,
      totalTaskCount,
      // unassignedTaskCount,
    };
  });

  membersWorkload.push({
    memberId: -1,
    memberName: "Unassigned",
    taskCountByStatus: unassignedTaskCountByStatus,
    totalTaskCount: unassignedTaskCount,
    // unassignedTaskCount,
  });

  return membersWorkload;
};

const getTaskStatusDistribution = async (projectId: string) => {
  // Get the start and end of the current week (Monday to Sunday)
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 6 });

  // Fetch tasks for the given project within the current week
  const tasks = await Task.query()
    .where("project_id", projectId)
    .where("created_at", ">=", start)
    .where("created_at", "<=", end)
    .get();

  // Initialize the result array with days of the week
  const result = eachDayOfInterval({ start, end }).map((date) => ({
    day: format(date, "EEEE"), // Get the day name (e.g., Monday)
    completed: 0,
    toDo: 0,
    inProgress: 0,
  }));

  // Group tasks by their status and the day of the week
  tasks.map((task: Task) => {
    const day = format(new Date(task.created_at), "EEEE"); // Get the day name (e.g., Monday)
    const dayResult = result.find((r) => r.day === day);
    if (dayResult) {
      if (task.status === "completed") {
        dayResult.completed += 1;
      } else if (task.status === "to-do") {
        dayResult.toDo += 1;
      } else if (task.status === "in-progress") {
        dayResult.inProgress += 1;
      }
    }
  });

  return result;
};

export const getOverviewCalendar = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { date } = req.query;

  try {
    const project = await Project.query().find(projectId);
    // Check if the project exists
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get the tasks for the project
    const tasks = await Task.query().where("project_id", projectId).get();

    // Initialize the result object
    const result: Record<string, any[]> = {};

    // Group tasks by the day they were created
    tasks.map((task: Task) => {
      const day = format(new Date(task.due_date), "yyyy-MM-dd");
      if (!result[day]) {
        result[day] = [];
      }
      result[day].push(task);
    });

    // If a date is provided, filter the result to only include tasks for that date
    if (date) {
      const formattedDate = format(new Date(date as string), "yyyy-MM-dd");
      return res.status(200).json({
        message: "Success",
        data: result[formattedDate] || [],
      });
    }

    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
