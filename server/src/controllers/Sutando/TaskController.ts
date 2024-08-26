import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";
import { Task } from "../../models/Task";
import { Project } from "../../models/Project";
import { TaskMember } from "../../models/TaskMember";
import { ProjectMember } from "../../models/ProjectMember";

export const getProjectTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projectTasks = await Task.query()
      .where("project_id", projectId)
      .get();

    // const data = projectTasks.map((task: any) => {
    //   return {
    //     id: task.id,
    //     content: task.name,
    //     description: task.description,
    //     priority: task.priority,
    //     columnId: task.status,
    //     startDate: task.start_date,
    //     dueDate: task.due_date,
    //   };
    // });

    return res.status(200).json({
      message: "Successfully retrieved project's tasks",
      data: projectTasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProjectTask = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { name, description, priority, status, startDate, dueDate, members } =
    req.body;
  try {
    const project = await Project.query().find(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.query().create({
      project_id: projectId,
      name: name,
      description: description,
      priority: priority,
      status: status,
      start_date: startDate,
      due_date: dueDate,
    });

    for (const member of members) {
      console.log(member);
      await TaskMember.query().create({
        task_id: task.id,
        project_member_id: member.id,
      });
    }

    // Add members later

    return res
      .status(201)
      .json({ message: "Successfully created project's task", data: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

export const getProjectTask = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;
  try {
    const projectTask = await Task.query()
      .where("project_id", projectId)
      .with(
        "projectMembers.user:id,username,email",
        "projectMembers:user_id,id,role"
      )
      .find(taskId);

    if (!projectTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const projectTaskData = {
      id: projectTask.id,
      name: projectTask.name,
      description: projectTask.description,
      priority: projectTask.priority,
      status: projectTask.status,
      startDate: projectTask.start_date,
      dueDate: projectTask.due_date,
      members: projectTask.projectMembers.map((member) => ({
        id: member.user.id,
        username: member.user.username,
        role: member.role,
      })),
    };

    return res
      .status(200)
      .json({ message: "Successfully retrieved task", data: projectTaskData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProjectTask = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;
  const { name, description, priority, status, startDate, dueDate } = req.body;

  try {
    const projectTask = await Task.query()
      .where("project_id", projectId)
      .where("id", taskId)
      .first();

    if (!projectTask) {
      return res.status(404).json({ message: "Task or project not found" });
    }

    projectTask.update({
      name,
      description,
      priority,
      status,
      start_date: startDate,
      due_date: dueDate,
    });

    return res
      .status(200)
      .json({ message: "Successfully updated", data: projectTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProjectTask = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;

  try {
    const projectTask = await Task.query()
      .where("project_id", projectId)
      .where("id", taskId)
      .firstOrFail();

    await projectTask.delete();

    return res
      .status(200)
      .json({ message: "Successfully deleted project's task" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
