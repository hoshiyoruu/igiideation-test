import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { message: "User id not provided" },
        { status: 400 }
      );

    const session = await prisma.session.findFirst({
      where: {
        userId: userId,
      },
    });

    if (session) return NextResponse.json(session, { status: 200 });
    else
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error(`Failed to find session : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");

    if (!userId)
      return NextResponse.json(
        { message: "User id not provided" },
        { status: 400 }
      );

    const deletedSession = await prisma.session.delete({
      where: {
        userId: userId,
      },
    });

    if (deletedSession)
      return NextResponse.json(
        {
          message: `Successfully delete session for user id ${userId}`,
        },
        { status: 200 }
      );
    else
      return NextResponse.json({
        message: `Session not found for user id ${userId}`,
      });
  } catch (error: any) {
    console.error(`Failed to delete session`);
    return NextResponse.json(error, { status: 500 });
  }
}
