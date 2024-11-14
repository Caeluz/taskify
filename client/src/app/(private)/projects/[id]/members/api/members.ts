"use server";
import { cookies } from "next/headers";

export async function fetchProjectMembers(projectId: number | string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const response = await fetch(`${apiUrl}/projects/${projectId}/members`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response) {
      throw new Error("Error fetching project members");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching project members ${error.message}`);
  }
}

export async function addMultipleProjectMembers(projectId: number | string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response) {
      throw new Error("Error adding multipler project members");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error adding multiple project members ${error.message}`);
  }
}
