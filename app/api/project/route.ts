import prisma from "@/prisma/db";
import modifyGoogleDriveLink from "@/util/modifyGoogleDriveLink";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


// create project title
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const projectForm = JSON.parse(formData.get("project") as string);

  // modify google drive link
  const abstractLink = modifyGoogleDriveLink(projectForm.abstractLink);
  const supportingDocumentLink1 = modifyGoogleDriveLink(
    projectForm.supportingDocumentLink1
  );
  const supportingDocumentLink2 = modifyGoogleDriveLink(
    projectForm.supportingDocumentLink2
  );
  const supportingDocumentLink3 = modifyGoogleDriveLink(
    projectForm.supportingDocumentLink3
  );
  const posterLink = modifyGoogleDriveLink(projectForm.posterLink);
  const videoLink = modifyGoogleDriveLink(projectForm.videoLink);

  try {
    const project = await prisma.project.create({
      data: {
        titleOfInnovation: projectForm.titleOfInnovation,
        abstractLink: abstractLink,
        supportingDocumentLink1: supportingDocumentLink1,
        supportingDocumentLink2: supportingDocumentLink2,
        supportingDocumentLink3: supportingDocumentLink3,
        posterLink: posterLink,
        videoLink: videoLink,
        status: "PENDING",
      },
    });
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to create project`, error);
    return NextResponse.json(error, { status: 500 });
  }
}

// search project
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get("projectId");

    if (!projectId)
      return NextResponse.json(
        { message: "Bad request. Enter project id" },
        { status: 400 }
      );

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (project) return NextResponse.json(project, { status: 200 });
    else
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error("Failed to fetch project", error);
    return NextResponse.json(error, { status: 500 });
  }
}

// update project
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const updatedProject: Project = JSON.parse(
      formData.get("project") as string
    );
    const id = formData.get("id") as string;

    if (!updatedProject)
      return NextResponse.json(
        { message: "Bad request. Provide updated project" },
        { status: 400 }
      );

    // modify google drive link
    const abstractLink = modifyGoogleDriveLink(updatedProject.abstractLink);
    const supportingDocumentLink1 = modifyGoogleDriveLink(
      updatedProject.supportingDocumentLink1
    );
    const supportingDocumentLink2 = modifyGoogleDriveLink(
      updatedProject.supportingDocumentLink2
    );
    const supportingDocumentLink3 = modifyGoogleDriveLink(
      updatedProject.supportingDocumentLink3
    );
    const posterLink = modifyGoogleDriveLink(updatedProject.posterLink);
    const videoLink = modifyGoogleDriveLink(updatedProject.videoLink);

    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        titleOfInnovation: updatedProject.titleOfInnovation,
        abstractLink: abstractLink,
        supportingDocumentLink1: supportingDocumentLink1,
        supportingDocumentLink2: supportingDocumentLink2,
        supportingDocumentLink3: supportingDocumentLink3,
        posterLink: posterLink,
        videoLink: videoLink,
      },
    });

    if (project)
      return NextResponse.json(
        {
          message: `Successfully update project title : ${project.titleOfInnovation}`,
        },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: `Project title to be updated not found` },
        { status: 404 }
      );
  } catch (error: any) {
    console.error("Failed to edit project", error);
    return NextResponse.json(error, { status: 500 });
  }
}

// delete project
export async function DELETE(req: NextRequest) {
  try {
    const formData = await req.formData();
    const projectId = formData.get("id") as string;

    if (!projectId)
      return NextResponse.json(
        { message: "Bad response. Provide project ID" },
        { status: 400 }
      );

    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    if (project)
      return NextResponse.json(
        { message: "Successfully delete project" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Project to be deleted not found" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error(`Failed to delete project`, error);
    return NextResponse.json(error, { status: 500 });
  }
}
