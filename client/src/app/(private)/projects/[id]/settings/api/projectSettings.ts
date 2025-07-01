"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function fetchProjectSettings(
  projectId: string | number
): Promise<{
  message: string;
  data: any;
}> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    const response = await fetch(`${apiUrl}/projects/${projectId}/settings`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching projects settings");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error fetching projects");
  }
}

export async function updateProjectDetails(
  userId: string | number,
  projectId: string | number,
  name: string | null,
  status: string | null
) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  try {
    const payload: Record<string, any> = {};
    if (name !== null) payload.name = name;
    if (status !== null) payload.status = status;

    const response = await fetch(
      `${apiUrl}/users/${userId}/projects/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
