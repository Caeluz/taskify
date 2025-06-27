"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

import { Project } from "../page";
import { useUserStore } from "@/store/zustand/userStore";

export default async function fetchUserProjects(
  userId: string | number
): Promise<{
  message: string;
  data: Project[];
}> {
  // req: NextApiRequest,
  // res: NextApiResponse
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    // return res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(
      `http://localhost:8081/api/users/${userId}/projects`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching projects");
    }

    const data = await response.json();

    // res.status(200).json(data);
    // return data;
    return data;
  } catch (error) {
    // res.status(500).json({ message: "Error fetching projects" });
    throw new Error("Error fetching projects");
  }
}

export async function createUserProject(
  userId: number | string,
  name: string,
  description: string,
  status: string
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token?.value) {
      throw new Error("Unauthorized");
    }

    console.log(name, description);

    const response = await fetch(`${apiUrl}/users/${userId}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        status: status,
      }),
    });

    // if (!response.ok) {
    //   // throw new Error("Error updating task status");
    //   const errorData = await response.json();
    //   throw new Error(errorData.error || response.statusText);
    // }

    console.log(response);

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error creating project: ${error.message}`);
  }
}

export async function deleteUserProject(userId: number | string, projectId: number | string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const response = await fetch(`${apiUrl}/users/${userId}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`
      }
    })

    if (!token?.value) {
      throw new Error("Unauthorized");
    }
    
  } catch (error: any) {
      throw new Error(`Error creating projects: ${error.message}`)
  }
}