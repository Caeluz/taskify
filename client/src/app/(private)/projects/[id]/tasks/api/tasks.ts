"use server";
import { cookies } from "next/headers";

export default async function fetchProjectTasks(projectId: number): Promise<{
  message: string;
  data: any;
}> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token?.value) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`${apiUrl}/projects/${projectId}/tasks`, {
      // cache: "no-store",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching project's tasks");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error fetching project's tasks: ${error.message}`);
  }
}

export async function updateTaskStatus(
  projectId: number,
  taskId: number | string,
  taskStatusId: number | string
): Promise<{ message: string; data: any }> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // log projectId, taskId, taskStatusId
    console.log(projectId, taskId, taskStatusId);

    if (!token?.value) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(
      `${apiUrl}/projects/${projectId}/tasks/${taskId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },

        body: JSON.stringify({ taskStatusId: taskStatusId }),
      }
    );

    if (!response.ok) {
      // throw new Error("Error updating task status");
      const errorData = await response.json();
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error updating task status: ${error.message}`);
  }
}

export async function updateTaskStatusAndPosition(
  projectId: number,
  taskId: number | string,
  taskStatusId: number | string,
  position: number | string
): Promise<{ message: string; data: any }> {
  // console.log(1);
  // console.log(projectId, taskId, taskStatusId, position);
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    // console.log(projectId, taskId, taskStatusId, position);
    if (!token?.value) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(
      `${apiUrl}/projects/${projectId}/tasks/${taskId}/status-position`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          taskStatusId,
          position,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      `Error updating task status and position: ${error.message}`
    );
  }
}

export async function createTask({
  projectId,
  name,
  description,
  members,
  priority,
  taskStatusId,
  dateRange,
}: {
  projectId: number;
  name: string;
  description: string;
  members?: number[];
  priority: string;
  taskStatusId: number;
  dateRange: { from: Date; to?: Date };
}): Promise<{ message: string; data: any }> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token?.value) {
      throw new Error("Unauthorized");
    }

    // Format members to match the backend's expected format
    const formattedMembers =
      members?.map((memberId) => ({ id: memberId })) || [];

    const response = await fetch(`${apiUrl}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        name,
        description,
        members: formattedMembers,
        priority,
        taskStatusId,
        startDate: dateRange.from,
        dueDate: dateRange.to,
      }),
    });

    if (!response.ok) {
      // Try to parse the error response if it's JSON
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If the response isn't JSON, fall back to the status text
        throw new Error(response.statusText);
      }

      // Use the backend's error message if available
      const errorMessage =
        errorData?.details
          ?.map((detail: any) => `${detail.path}: ${detail.message}`)
          .join(", ") || response.statusText;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creating task:", error.message);
    throw new Error(`Error creating task: ${error.message}`);
  }
}
