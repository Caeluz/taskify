"use server";
import { UniqueIdentifier } from "@dnd-kit/core";
import { cookies } from "next/headers";

export async function fetchColumns(projectId: number): Promise<{
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
    const response = await fetch(`${apiUrl}/projects/${projectId}/columns`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching project's columns");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error fetching project's columns: ${error.message}`);
  }
}

export async function updateColumnPosition(
  projectId: number,
  columnId: number | UniqueIdentifier,
  position: number
): Promise<{ message: string; data: any }> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token?.value) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(
      `${apiUrl}/projects/${projectId}/columns/${columnId}/position`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ position }),
      }
    );

    console.log(projectId, columnId, position);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error updating column position: ${error.message}`);
  }
}
