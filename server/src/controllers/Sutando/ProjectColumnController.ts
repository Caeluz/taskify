import { ModelNotFoundError, sutando } from "sutando";
import { Request, Response } from "express";

import { Project } from "../../models/Project";
import {
  sutandoConnection,
  sutandoDB,
} from "../../../database/SutandoPGDatabase";
import { ProjectColumn } from "../../models/ProjectColumn";
import { TaskStatus } from "../../models/TaskStatus";
sutandoConnection;

export const getProjectColumns = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    const projectColumns = await ProjectColumn.query()
      .where("project_id", projectId)
      .with("taskStatus")
      .get();

    return res.status(200).json({ message: "success", data: projectColumns });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const createProjectColumn = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { taskStatusId } = req.body;

  const taskStatus = await TaskStatus.query().find(taskStatusId);

  if (!taskStatus) {
    return res.status(404).json({ message: "Task status not found" });
  }

  // Check for duplicate task status in the same project
  const existingColumn = await ProjectColumn.query()
    .where("project_id", projectId)
    .where("task_status_id", taskStatusId)
    .first();

  if (existingColumn) {
    return res
      .status(400)
      .json({ message: "Duplicate task status in the same project" });
  }

  try {
    const projectColumn = await ProjectColumn.query().create({
      project_id: projectId,
      task_status_id: taskStatusId,
    });

    return res.status(201).json({ message: "success", data: projectColumn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const updateProjectColumnStatus = async (
  req: Request,
  res: Response
) => {
  const { projectId, projectColumnId } = req.params;
  const { taskStatusId } = req.body;

  const taskStatus = await TaskStatus.query().find(taskStatusId);

  if (!taskStatus) {
    return res.status(404).json({ message: "Task status not found" });
  }

  // Check for duplicate task status in the same project
  const existingColumn = await ProjectColumn.query()
    .where("project_id", projectId)
    .where("task_status_id", taskStatusId)
    .first();

  if (existingColumn) {
    return res
      .status(400)
      .json({ message: "Duplicate task status in the same project" });
  }

  try {
    const projectColumn = await ProjectColumn.query()
      .where("project_id", projectId)
      .where("id", projectColumnId)
      .update({
        task_status_id: taskStatusId,
      });

    return res.status(200).json({ message: "success", data: projectColumn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

// export const updateProjectColumnPosition = async (req: Request, res: Response) => {
//   const { projectId, projectColumnId } = req.params;
//   const { position } = req.body;

//   try {
//     // Check for duplicate position in the same project
//     const existingColumn = await ProjectColumn.query()
//       .where("project_id", projectId)
//       .where("position", position)
//       .first();

//     if (existingColumn) {
//       return res
//         .status(400)
//         .json({ message: "Duplicate position in the same project" });
//     }

//     const projectColumn = await ProjectColumn.query()
//       .where("project_id", projectId)
//       .where("id", projectColumnId)
//       .update({
//         position: position,
//       });

//     return res.status(200).json({ message: "success", data: projectColumn });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error });
//   }
// };

export const updateProjectColumnPosition = async (
  req: Request,
  res: Response
) => {
  const { projectId, projectColumnId } = req.params;
  const { position } = req.body; // The new desired position for the column

  try {
    // Retrieve the current column's data
    const currentColumn = await ProjectColumn.query()
      .where("project_id", projectId)
      .where("id", projectColumnId)
      .first();

    if (!currentColumn) {
      return res.status(404).json({ message: "Column not found" });
    }

    const currentPosition = currentColumn.position;

    // return res.status(200).json({ message: currentOrder, position: position });

    // If the new position is the same as the current one, no need to do anything
    if (currentPosition === position) {
      return res.status(200).json({ message: "No changes needed" });
    }

    // Begin a transaction to update the positions safely
    await sutandoDB.transaction(async (trx) => {
      // Step 1: Set the current column's position to a temporary value
      await ProjectColumn.query()
        .transacting(trx)
        .where("project_id", projectId)
        .where("id", projectColumnId)
        .update({
          position: -1,
        });

      if (currentPosition < position) {
        // Shift other columns up to fill the gap
        await ProjectColumn.query()
          .transacting(trx)
          .where("project_id", projectId)
          .whereBetween("position", [currentPosition + 1, position])
          .decrement("position", 1);
      } else {
        // Shift other columns down to fill the gap
        await ProjectColumn.query()
          .transacting(trx)
          .where("project_id", projectId)
          .whereBetween("position", [position, currentPosition - 1])
          .increment("position", 1);
      }

      // Update the current column's position to the new position
      await ProjectColumn.query()
        .transacting(trx)
        .where("project_id", projectId)
        .where("id", projectColumnId)
        .update({
          position: position,
        });
    });

    return res.status(200).json({ message: "success", newPosition: position });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
