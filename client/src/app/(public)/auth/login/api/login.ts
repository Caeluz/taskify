"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(
  usernameOrEmail: string,
  password: string
): Promise<{
  message: string;
  token: string;
  data: any;
  ok: boolean;
}> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameOrEmail,
        password: password,
      }),
    });

    const cookieStore = await cookies();

    console.log(response.ok);
    const data = await response.json();

    if (response.ok) {
      // Put the token in cookie
      cookieStore.set("token", data.token);
    }

    return { ...data, ok: response.ok };
  } catch (error: any) {
    throw new Error(`Error logging in ${error.message}`);
  }
}
