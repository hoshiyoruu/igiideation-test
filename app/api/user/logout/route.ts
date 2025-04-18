import { decrypt, deleteSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session");
    const session = sessionCookie?.value;

    const payload = await decrypt(session);
    const userId = payload?.userId;


    if (!userId)
      return NextResponse.json(
        { message: "Bad response : Include userid" },
        { status: 400 }
      );

    await deleteSession(userId);

    return NextResponse.json(
      { message: "Successfully logout" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to logout from account`, error);
    throw error;
  }
}
