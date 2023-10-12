import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middelware");
  console.log(request.url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
