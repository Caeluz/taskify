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
        // username: data.usernameOrEmail,
        // password: data.password,
        username: usernameOrEmail,
        password: password,
      }),
    });

    console.log(response);

    const cookieStore = await cookies();

    console.log(response.ok);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Put the token in cookie
      cookieStore.set("token", data.token);
    }

    return data;

    // if (response.ok) {
    //   // Toast
    //   toast({
    //     title: "Login successful",
    //     description: "You have successfully logged in",
    //   });

    //   // setTimeout(() => {
    //   //   router.push("/projects");
    //   // }, 2000);

    //   const user = await response.json();
    //   console.log("Login successful:", user);

    //   // Put the user data in zustand
    //   setUser(user.data);
    // } else {
    //   const error = await response.json();
    //   setBackendError(error.message || "Login failed");
    //   form.setError("backend", {
    //     type: "manual",
    //     message: error.message || "Login failed",
    //   });
    //   console.log(error);
    // }
  } catch (error: any) {
    throw new Error(`Error logging in ${error.message}`);
  }
}
