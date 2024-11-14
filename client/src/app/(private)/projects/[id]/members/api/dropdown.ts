"use server";
import { cookies } from "next/headers";

export async function fetchUsersforDropdown(projectId: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const queryParams = new URLSearchParams({
      projectId: "1",
    });

    const url = `${apiUrl}/dropdown-data/users?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response) {
      throw new Error("Error fetching users");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching users ${error.message}`);
  }
}
