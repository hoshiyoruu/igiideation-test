import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { Judge } from "@prisma/client";
import hashPassword from "@/util/hashPassword";

export const dynamic = 'force-dynamic'


export async function POST(req: NextRequest) {
  try {
    const { name, email, password, association } = await req.json();

    const hashedPassword = await hashPassword(password);

    const judge = await prisma.judge.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        association: association,
      },
    });

    if (judge)
      return NextResponse.json(
        { message: "Successfully create judge account" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Failed to create judge account" },
        { status: 400 }
      );
  } catch (error: any) {
    console.error(`Failed to create judge : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formdata = await req.formData();

    const judge: Judge = JSON.parse(formdata.get("judge") as string);
    const judgeId = formdata.get("judgeId") as string;

    const hashedPassword = await hashPassword(judge.password);
    console.log(hashedPassword);

    await prisma.judge.update({
      where: {
        id: judgeId,
      },
      data: {
        name: judge.name,
        email: judge.email,
        association: judge.association,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Successfully update judge" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to update judge : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const judgeId = formdata.get("judgeId") as string;

    const judge = await prisma.judge.delete({
      where: {
        id: judgeId,
      },
    });

    if (judge) return NextResponse.json(judge, { status: 200 });
    else
      return NextResponse.json({ message: "Judge not found" }, { status: 404 });
  } catch (error: any) {
    console.error(`Failed to delete judge : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
