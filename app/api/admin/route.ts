import prisma from "@/prisma/db";
import hashPassword from "@/util/hashPassword";
import { Admin } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await hashPassword(password);

    await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Successfully create admin account" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to create admin account : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const adminId = formdata.get("adminId") as string;

    const admin = await prisma.admin.delete({
      where: {
        id: adminId,
      },
    });

    if (admin) return NextResponse.json(admin, { status: 200 });
    else return NextResponse.json({ message: "Admin not found" });
  } catch (error: any) {
    throw error;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const admin: Admin = JSON.parse(formdata.get("admin") as string);
    const adminId = formdata.get("adminId") as string;

    const hashedPassword = await hashPassword(admin.password);

    const updatedAdmin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error: any) {
    console.error(`failed to update admin account : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const adminId = searchParams.get("id");

    if (!adminId)
      return NextResponse.json(
        { message: "Admin id not provided" },
        { status: 400 }
      );

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (admin) {
      return NextResponse.json(admin, { status: 200 });
    } else {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(`Failed to get admin information : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
