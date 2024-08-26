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
      // return res.status(401).json({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }
    const response = await fetch(`${apiUrl}/projects/${projectId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error("Error fetching project's tasks");
    }

    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching project's tasks");
  }
}
