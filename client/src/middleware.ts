// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   console.log(`Middleware triggered for path: ${path}`);

//   // Treat all matched routes as private
//   console.log("Private route accessed");
//   // Example: Redirect to login if not authenticated
//   // if (!isAuthenticated(request)) {
//   if (true) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // return NextResponse.redirect(new URL("/auth/login", request.url));

//   console.log("Proceeding to next middleware or route handler");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
//     "/projects",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("token");
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  console.log(token);

  // if (!token && request.nextUrl.pathname.startsWith("/projects")) {
  if (!token && request.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
    "/projects",
  ],
};
