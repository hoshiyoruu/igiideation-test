import prisma from "@/prisma/db";
import { Judge } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  try {
    const formdata = await request.formData();

    const projectId = formdata.get("projectId") as string;
    const judges: Judge[] = JSON.parse(formdata.get("judges") as string);

    for (const judge of judges) {
      // remove judge project bridge
      await prisma.judgeProjectBridge.delete({
        where: {
          judgeId_projectId: {
            judgeId: judge.id,
            projectId: projectId,
          },
        },
      });

      // update assigned project in judge model
      const updatedAssignedProject = judge.projectToBeJudged.filter(
        (id) => id !== projectId
      );
      await prisma.judge.update({
        where: {
          id: judge.id,
        },
        data: {
          projectToBeJudged: updatedAssignedProject,
        },
      });
    }
    // find assigned judges in project model
    const assignedJudgesIds = (
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      })
    )?.assignedJudges;

    // filter assigned judge by removing judge that want to be removed
    const filteredJudges = assignedJudgesIds?.filter((assignedJudgeId) =>
      !judges.map((judge) => judge.id).includes(assignedJudgeId)
    );

    // update assigned judge from project model
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        assignedJudges: filteredJudges,
      },
    });

    return NextResponse.json(
      { message: "Successfully de-assign judges" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to deassign judges : ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
