"use server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function logout(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    // Remove token
    cookieStore.delete("token");

    const token = request.cookies.get("token");

    return "Logged out";
  } catch (error) {
    throw new Error("Error logging out");
  }
}
