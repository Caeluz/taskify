"use server";
import { cookies } from "next/headers";
import { ProjectMember } from "../AddMembersDialogContent";

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

export async function addMultipleProjectMembers(
  projectId: number | string,
  projectMembers: ProjectMember[]
): Promise<any> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const body = projectMembers.map((projectMember) => {
      return {
        userId: Number(projectMember.id),
        role: projectMember.role,
      };
    });

    const payload = { members: body };

    const response = await fetch(
      `${apiUrl}/projects/${projectId}/members/add-multiple`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Error adding multiple project members");
    }
    const data = await response.json();
    console.log("Response data:", data); // Debugging statement
    return data;
  } catch (error: any) {
    console.error("Error in addMultipleProjectMembers:", error); // Debugging statement
    throw new Error(`Error adding multiple project members ${error.message}`);
  }
}
