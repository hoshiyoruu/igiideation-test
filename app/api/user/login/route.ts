import prisma from "@/prisma/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSession } from "@/util/session";
import verifyPassword from "@/util/verifyPassword";

export const dynamic = 'force-dynamic'


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const type = formData.get("type") as string;

    if (!email || !password)
      return NextResponse.json(
        { message: "Bad response : Enter email and password" },
        { status: 400 }
      );

    if (type === "ADMIN") {
      const loginAdminResult = await loginAsAdmin(email, password);
      if (loginAdminResult === 401)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      else if (loginAdminResult === 404)
        return NextResponse.json(
          { message: "Admin account not found" },
          { status: 404 }
        );
      else return NextResponse.json(loginAdminResult, { status: 200 });
    } else if (type === "JUDGE") {
      const loginJudgeResult = await loginAsJudge(email, password);

      if (loginJudgeResult === 401)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      else if (loginJudgeResult === 404)
        return NextResponse.json(
          { message: "Judge account not found" },
          { status: 404 }
        );
      else return NextResponse.json(loginJudgeResult, { status: 200 });
    } else {
      console.error("Unspecified account type");
      return NextResponse.json(
        { message: "Unspecified account type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(`Failed to login account`, error);
    return NextResponse.json(error, { status: 500 });
  }
}

async function loginAsAdmin(email: string, password: string) {
  const admin = await prisma.admin.findFirst({
    where: { email: email },
  });

  if (admin) {
    const isMatchPassword = await verifyPassword(password, admin.password);

    if (isMatchPassword) {
      await createSession(admin.id);
      return admin;
    } else {
      return 401; // unauthorized
    }
  } else {
    return 404; // admin not found
  }
}

async function loginAsJudge(email: string, password: string) {
  const judge = await prisma.judge.findFirst({
    where: {
      email: email,
    },
  });

  if (judge) {
    const isMatchPassword = await verifyPassword(password, judge.password);

    if (isMatchPassword) {
      await createSession(judge.id);
      return judge;
    } else {
      return 401;
    }
  } else {
    return 404;
  }
}
