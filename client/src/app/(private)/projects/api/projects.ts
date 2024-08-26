"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

import { Project } from "../page";

export default async function fetchProjects(): Promise<{
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
    const response = await fetch("http://localhost:8081/api/projects", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

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