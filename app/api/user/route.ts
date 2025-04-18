import { decrypt, updateSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  try {
    // Retrieve session cookie
    const sessionCookie = req.cookies.get("session");

    if (!sessionCookie) {
      return NextResponse.json(
        { message: "No session cookie included" },
        { status: 401 }
      );
    }

    // Update session (assumes side effects or logging)
    await updateSession();

    // Decrypt the session value
    const sessionValue = sessionCookie.value;
    const payload = await decrypt(sessionValue);

    // Validate payload
    if (!payload) {
      return NextResponse.json(
        { message: "Invalid session value" },
        { status: 401 }
      );
    }

    // Extract user ID and return as response
    const { userId } = payload;
    return NextResponse.json(userId, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
