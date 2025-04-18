import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET() {
  try {
    const judges = await prisma.judge.findMany({});

    return NextResponse.json(judges, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to all judges : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
