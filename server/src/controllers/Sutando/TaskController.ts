import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";
import { Task } from "../../models/Task";
import { Project } from "../../models/Project";

export const getProjectTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projectTasks = await Task.query()
      .where("project_id", projectId)
      .get();

    return res.status(200).json({
      message: "Successfully retrieved project's tasks",
      data: projectTasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProjectTask = async (req: Request, res: Response) => {
  const projectId = parseInt(req.params.projectId, 10);
  const { name, description, priority, status, startDate, dueDate } = req.body;
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

    // Add members later

    return res
      .status(201)
      .json({ message: "Successfully created project's task", data: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
