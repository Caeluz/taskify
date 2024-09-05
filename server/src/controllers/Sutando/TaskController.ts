import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";
import { Task } from "../../models/Task";
import { Project } from "../../models/Project";
import { TaskMember } from "../../models/TaskMember";
import { ProjectMember } from "../../models/ProjectMember";
import { TaskStatus } from "../../models/TaskStatus";
import {
  sutandoConnection,
  sutandoDB,
} from "../../../database/SutandoPGDatabase";

export const getProjectTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projectTasks = await Task.query()
      .where("project_id", projectId)
      .with("taskStatus")
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
  const {
    name,
    description,
    priority,
    taskStatusId,
    startDate,
    dueDate,
    members,
  } = req.body;
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
      task_status_id: taskStatusId,
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
        "projectMembers:user_id,id,role",
        "taskStatus:id,name as status"
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
      status: projectTask.taskStatus,
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
  const { name, description, priority, taskStatusId, startDate, dueDate } =
    req.body;

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
      task_status_id: taskStatusId,
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

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;
  const { taskStatusId } = req.body;

  try {
    const task = await Task.query().where("project_id", projectId).find(taskId);

    const taskStatus = await TaskStatus.query().find(taskStatusId);

    if (!taskStatus) {
      return res.status(404).json({ message: "Task status not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.update({
      task_status_id: taskStatusId,
    });

    return res
      .status(200)
      .json({ message: "Successfully updated task status" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskStatusAndPosition = async (
  req: Request,
  res: Response
) => {
  const { projectId, taskId } = req.params;
  const { taskStatusId, position } = req.body; // New status (column) and position

  try {
    if (!taskStatusId || !position) {
      return res
        .status(400)
        .json({ message: "task_status_id and position are required" });
    }

    // Start a transaction to ensure atomic updates
    await sutandoDB.transaction(async (trx) => {
      // Step 1: Retrieve the current task's details
      const currentTask = await Task.query(trx)
        .where("project_id", projectId)
        .where("id", taskId)
        .first();

      if (!currentTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      const currentStatusId = currentTask.task_status_id;
      const currentPosition = currentTask.position;

      // if same
      if (currentStatusId === taskStatusId && currentPosition === position) {
        return res.status(200).json({
          message: "Task status and position are the same. No changes made",
        });
      }

      // Step 2: If the status (column) is changing, adjust positions in both old and new columns
      if (currentStatusId !== taskStatusId) {
        await Task.query(trx)
          .where("project_id", projectId)
          .where("id", taskId)
          .update({ position: -1 });
        // return true;
        // return res.status(400).json({
        //   message: "Task status change is not supported in this version",
        // });

        // Step 2a: Shift the positions in the old column (fill the gap)
        await Task.query(trx)
          .where("project_id", projectId)
          .where("task_status_id", currentStatusId)
          .where("position", ">", currentPosition)
          .decrement("position", 1);

        // Step 2b: Shift the positions in the new column (make space)
        await Task.query(trx)
          .where("project_id", projectId)
          .where("task_status_id", taskStatusId)
          .where("position", ">=", position)
          .increment("position", 1);
      } else {
        // Step 2c: If the status is the same, just reorder within the same column

        // Add a temporary position to the current task to free up space
        await Task.query(trx)
          .where("project_id", projectId)
          .where("id", taskId)
          .update({ position: -1 });

        if (currentPosition < position) {
          await Task.query(trx)
            .where("project_id", projectId)
            .where("task_status_id", taskStatusId)
            .whereBetween("position", [currentPosition + 1, position])
            .decrement("position", 1);
        } else if (currentPosition > position) {
          await Task.query(trx)
            .where("project_id", projectId)
            .where("task_status_id", taskStatusId)
            .whereBetween("position", [position, currentPosition - 1])
            .increment("position", 1);
        }
      }

      // Step 3: Finally, update the task with the new status and position
      await Task.query(trx)
        .where("project_id", projectId)
        .where("id", taskId)
        .update({
          task_status_id: taskStatusId,
          position: position,
        });
    });

    return res
      .status(200)
      .json({ message: "Task status and position updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
