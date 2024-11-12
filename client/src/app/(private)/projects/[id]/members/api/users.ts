"use server";
import { cookies } from "next/headers";

export async function fetchUsers() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const response = await fetch(`${apiUrl}/users`, {
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
