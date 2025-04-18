import prisma from "@/prisma/db";
import { decrypt, deleteSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, response: NextResponse) {
  const rootUrl = req.nextUrl.origin;

  const isCookieExists = () => {
    const sessionCookie = req.cookies.get("session");
    const value = sessionCookie?.value;
    return value || null;
  };

  // Main Execution
  const excludedPaths = ["/admin/login", "/login"];
  if (excludedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const isHasSession = isCookieExists();
  if (isHasSession) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(req.nextUrl.origin);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/judge", "/evaluate/:path*"],
};
