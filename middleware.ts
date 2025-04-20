
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  console.log("Middleware: Token check", { token, user, pathname: request.nextUrl.pathname });

  if (isAuthPage && token) {
    console.log("Middleware: Redirecting /auth to / because token exists");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthPage) {
    console.log("Middleware: Redirecting to /auth because no token");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
