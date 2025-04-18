import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET() {
  try {
    const admins = await prisma.admin.findMany({});

    return NextResponse.json(admins, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to get all admins : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
