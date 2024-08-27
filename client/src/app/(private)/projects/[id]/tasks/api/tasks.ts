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
  taskStatusId: number
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
