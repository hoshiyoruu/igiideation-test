import prisma from "@/prisma/db";
import { decrypt } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


// mark project
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const judgeId = formData.get("judgeId") as string;
    const noveltyAndUniquenessMark = parseInt(
      formData.get("noveltyAndUniquenessMark") as string
    );
    const benefitToMankindMark = parseInt(
      formData.get("benefitToMankindMark") as string
    );
    const commercializationMark = parseInt(
      formData.get("commercializationMark") as string
    );
    const statusOfInventionMark = parseInt(
      formData.get("statusOfInventionMark") as string
    );
    const videoPresentationMark = parseInt(
      formData.get("videoPresentationMark") as string
    );
    const supportingDocumentMark = parseInt(
      formData.get("supportingDocumentMark") as string
    );
    const platinumAward = formData.get("platinumAward") as string;
    const sustainabilityAward = formData.get("sustainabilityAward") as string;
    const innovatexAward = formData.get("innovatexAward") as string;

    const isPlatinumAward = platinumAward === "Yes";
    const isSustainabilityAward = sustainabilityAward === "Yes";
    const isInnovatexAward = innovatexAward === "Yes";

    const comments = formData.get("comments") as string;
    const sessionCookie = req.cookies.get("session");
    const jwt = sessionCookie?.value;

    // check if jwt exists
    if (!jwt || !sessionCookie)
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );

    // check if can decrypt
    const payload = await decrypt(jwt);
    if (!payload)
      return NextResponse.json(
        { message: "You are not a valid user" },
        { status: 401 }
      );

    // check if session in database
    const session = await prisma.session.findFirst({
      where: {
        userId: payload.userId,
      },
    });

    if (!session)
      return NextResponse.json(
        { message: "No database session" },
        { status: 401 }
      );

    // create mark and link to project
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        JudgeProjectBridge: {
          update: {
            where: {
              judgeId_projectId: {
                judgeId: judgeId,
                projectId: projectId,
              },
            },
            data: {
              noveltyAndUniquenessMark: noveltyAndUniquenessMark,
              benefitToMankindMark: benefitToMankindMark,
              commercializationMark: commercializationMark,
              statusOfInventionMark: statusOfInventionMark,
              videoPresentationMark: videoPresentationMark,
              supportingDocumentMark: supportingDocumentMark,
              isPlatinumAward: isPlatinumAward,
              isSustainabilityAward: isSustainabilityAward,
              isInnovatexAward: isInnovatexAward,
              isProjectMarked: true,
              comments: comments,
            },
          },
        },
      },
    });

    if (project)
      return NextResponse.json(
        { message: "Succesfully create mark and link to project" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Cannot find project" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error(`Failed to change project status`, error);
    return NextResponse.json(error, { status: 500 });
  }
}
