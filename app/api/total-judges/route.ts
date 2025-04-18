import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const projectId = searchParams.get("projectId") as string;

  const totalJudges = await prisma.judgeProjectBridge.count({
    where: {
      projectId: projectId,
    },
  });

  return NextResponse.json(totalJudges, { status: 200 });
}
