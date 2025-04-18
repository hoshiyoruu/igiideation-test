import prisma from "@/prisma/db";
import { ProjectAndTotalJudgesType } from "@/util/type";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const judgeId = searchParams.get("judgeId") as string;

    if (judgeId) {
      // return projects associated to the judge only
      const judge = await prisma.judge.findFirst({
        where: {
          id: judgeId,
        },
        select: {
          projectToBeJudged: true,
        },
      });

      const projects: Project[] = [];
      for (const projectId of judge?.projectToBeJudged || []) {
        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
          },
          include: {
            JudgeProjectBridge: {
              where: {
                AND: [{ projectId: projectId }, { judgeId: judgeId }],
              },
            },
          },
        });

        if (project) {
          projects.push(project);
        }
      }

      return NextResponse.json(projects, { status: 200 });
    } else {
      // return all projects
      const projects = await prisma.project.findMany({
        include: {
          JudgeProjectBridge: {
            include : {
              judge : true
            }
          }
        },
      });
      

      const projectsAndTotalJudges: ProjectAndTotalJudgesType[] = [];

      for (const project of projects) {
        const totalJudges = await prisma.judgeProjectBridge.count({
          where: {
            projectId: project.id,
          },
        });

        projectsAndTotalJudges.push({ ...project, totalJudges });
      }

      if (projectsAndTotalJudges)
        return NextResponse.json(projectsAndTotalJudges, { status: 200 });
      else
        NextResponse.json({ message: "Projects not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(`Failed to get all projects`, error);
    return NextResponse.json(error, {status : 500})
  }
}
