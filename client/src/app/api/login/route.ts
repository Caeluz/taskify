// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const cookieStore = cookies();
    const body = await req.json();
    // const token = cookieStore.get("token");
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   username: body.username,
      //   password: body.password,
      // }),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    const { token } = data;

    console.log(data);

    return new Response("Authentication successful", {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
      },
    });

    return Response.json(
      { message: "Authentication successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    // return new Response("Authentication failed", { status: 401 });
    return Response.json({ message: "Authentication failed" }, { status: 401 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return Response.json({ message: "Hello World" });
}
