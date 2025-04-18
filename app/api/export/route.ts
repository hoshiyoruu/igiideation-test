import prisma from "@/prisma/db";
import classifyMark from "@/util/classifyMark";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// export format
// project id, title of innovation, mark judge1, judge2, judge3, judge4, judge5, average mark, badge

// Requirements
//1. check if all judges have mark their assigned project

type JudgeType = {
  name: string;
  total_mark: number;
  novelty_and_uniqueness_mark: number;
  benefit_to_mankind_mark: number;
  commercialization_mark: number;
  status_of_invention_mark: number;
  video_presentation_mark: number;
  supporting_document_mark: number;
  is_platinum_award: boolean;
  is_sustainability_award: boolean;
  is_innovatex_award: boolean;
  comment: string | null;
};

type ProjectRowType = {
  project_id: string;
  project_title: string;
  average_mark: number;
  badge: "GOLD" | "SILVER" | "BRONZE";
  total_judges: number;

  judge1_name: string;
  judge1_novelty_and_uniqueness_mark: number;
  judge1_benefit_to_mankind_mark: number;
  judge1_commercialization_mark: number;
  judge1_status_of_invention_mark: number;
  judge1_video_presentation_mark: number;
  judge1_supporting_document_mark: number;
  judge1_is_platinum_award: boolean;
  judge1_is_sustainability_award: boolean;
  judge1_is_innovatex_award: boolean;
  judge1_comment: string | null;

  judge2_name: string;
  judge2_novelty_and_uniqueness_mark: number;
  judge2_benefit_to_mankind_mark: number;
  judge2_commercialization_mark: number;
  judge2_status_of_invention_mark: number;
  judge2_video_presentation_mark: number;
  judge2_supporting_document_mark: number;
  judge2_is_platinum_award: boolean;
  judge2_is_sustainability_award: boolean;
  judge2_is_innovatex_award: boolean;
  judge2_comment: string | null;

  judge3_name: string;
  judge3_novelty_and_uniqueness_mark: number;
  judge3_benefit_to_mankind_mark: number;
  judge3_commercialization_mark: number;
  judge3_status_of_invention_mark: number;
  judge3_video_presentation_mark: number;
  judge3_supporting_document_mark: number;
  judge3_is_platinum_award: boolean;
  judge3_is_sustainability_award: boolean;
  judge3_is_innovatex_award: boolean;
  judge3_comment: string | null;

  judge4_name: string;
  judge4_novelty_and_uniqueness_mark: number;
  judge4_benefit_to_mankind_mark: number;
  judge4_commercialization_mark: number;
  judge4_status_of_invention_mark: number;
  judge4_video_presentation_mark: number;
  judge4_supporting_document_mark: number;
  judge4_is_platinum_award: boolean;
  judge4_is_sustainability_award: boolean;
  judge4_is_innovatex_award: boolean;
  judge4_comment: string | null;

  judge5_name: string;
  judge5_novelty_and_uniqueness_mark: number;
  judge5_benefit_to_mankind_mark: number;
  judge5_commercialization_mark: number;
  judge5_status_of_invention_mark: number;
  judge5_video_presentation_mark: number;
  judge5_supporting_document_mark: number;
  judge5_is_platinum_award: boolean;
  judge5_is_sustainability_award: boolean;
  judge5_is_innovatex_award: boolean;
  judge5_comment: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        JudgeProjectBridge: {
          include: {
            judge: true,
          },
        },
      },
    });

    const header = [
      "project_id",
      "project_title",
      "average_mark",
      "badge",
      "total_judges",

      "judge1_name",
      "novelty_and_uniqueness_mark_judge1",
      "benefit_to_mankind_mark_judge1",
      "commercialization_mark_judge1",
      "status_of_invention_mark_judge1",
      "video_presentation_mark_judge1",
      "supporting_document_mark_judge1",
      "is_platinum_award_judge1",
      "is_sustainability_award_judge1",
      "is_innovatex_award_judge1",
      "comment_judge1",

      "judge2_name",
      "novelty_and_uniqueness_mark_judge2",
      "benefit_to_mankind_mark_judge2",
      "commercialization_mark_judge2",
      "status_of_invention_mark_judge2",
      "video_presentation_mark_judge2",
      "supporting_document_mark_judge2",
      "is_platinum_award_judge2",
      "is_sustainability_award_judge2",
      "is_innovatex_award_judge2",
      "comment_judge2",

      "judge3_name",
      "novelty_and_uniqueness_mark_judge3",
      "benefit_to_mankind_mark_judge3",
      "commercialization_mark_judge3",
      "status_of_invention_mark_judge3",
      "video_presentation_mark_judge3",
      "supporting_document_mark_judge3",
      "is_platinum_award_judge3",
      "is_sustainability_award_judge3",
      "is_innovatex_award_judge3",
      "comment_judge3",

      "judge4_name",
      "novelty_and_uniqueness_mark_judge4",
      "benefit_to_mankind_mark_judge4",
      "commercialization_mark_judge4",
      "status_of_invention_mark_judge4",
      "video_presentation_mark_judge4",
      "supporting_document_mark_judge4",
      "is_platinum_award_judge4",
      "is_sustainability_award_judge4",
      "is_innovatex_award_judge4",
      "comment_judge4",

      "judge5_name",
      "novelty_and_uniqueness_mark_judge5",
      "benefit_to_mankind_mark_judge5",
      "commercialization_mark_judge5",
      "status_of_invention_mark_judge5",
      "video_presentation_mark_judge5",
      "supporting_document_mark_judge5",
      "is_platinum_award_judge5",
      "is_sustainability_award_judge5",
      "is_innovatex_award_judge5",
      "comment_judge5",
    ];

    const projectRowsObj = projects.map((project) => {
      const totalJudges = project.JudgeProjectBridge.length;

      let grandTotalMark = 0;
      project.JudgeProjectBridge.forEach((proj) => {
        const total =
          proj.benefitToMankindMark +
          proj.commercializationMark +
          proj.noveltyAndUniquenessMark +
          proj.statusOfInventionMark +
          proj.supportingDocumentMark +
          proj.videoPresentationMark;
        grandTotalMark += total;
      });

      const averageMark = grandTotalMark / totalJudges;
console.log("helo")
      const row: ProjectRowType = {
        project_id: project.id,
        project_title: project.titleOfInnovation,
        average_mark: averageMark,
        badge: classifyMark(averageMark),
        total_judges: totalJudges,

        judge1_name: project.JudgeProjectBridge[0]?.judge.name ?? "Unnamed",
        judge1_novelty_and_uniqueness_mark:
          project.JudgeProjectBridge[0]?.noveltyAndUniquenessMark ?? 0,
        judge1_benefit_to_mankind_mark: project.JudgeProjectBridge[0]?.benefitToMankindMark ?? 0,
        judge1_commercialization_mark: project.JudgeProjectBridge[0]?.commercializationMark ?? 0,
        judge1_status_of_invention_mark: project.JudgeProjectBridge[0]?.statusOfInventionMark ?? 0,
        judge1_video_presentation_mark: project.JudgeProjectBridge[0]?.videoPresentationMark ?? 0,
        judge1_supporting_document_mark: project.JudgeProjectBridge[0]?.supportingDocumentMark ?? 0,

        judge1_is_platinum_award: project.JudgeProjectBridge[0]?.isPlatinumAward ?? false,
        judge1_is_sustainability_award: project.JudgeProjectBridge[0]?.isSustainabilityAward ?? false,
        judge1_is_innovatex_award: project.JudgeProjectBridge[0]?.isInnovatexAward ?? false,
        judge1_comment: project.JudgeProjectBridge[0].comments ?? "no comment",

        judge2_name: project.JudgeProjectBridge[1]?.judge.name ?? "Unnamed",
        judge2_novelty_and_uniqueness_mark:
          project.JudgeProjectBridge[1]?.noveltyAndUniquenessMark ?? 0,
        judge2_benefit_to_mankind_mark: project.JudgeProjectBridge[1]?.benefitToMankindMark ?? 0,
        judge2_commercialization_mark: project.JudgeProjectBridge[1]?.commercializationMark ?? 0,
        judge2_status_of_invention_mark: project.JudgeProjectBridge[1]?.statusOfInventionMark ?? 0,
        judge2_video_presentation_mark: project.JudgeProjectBridge[1]?.videoPresentationMark ?? 0,
        judge2_supporting_document_mark: project.JudgeProjectBridge[1]?.supportingDocumentMark ?? 0,
        judge2_is_platinum_award: project.JudgeProjectBridge[1]?.isPlatinumAward ?? 0,
        judge2_is_sustainability_award: project.JudgeProjectBridge[1]?.isSustainabilityAward ?? 0,
        judge2_is_innovatex_award: project.JudgeProjectBridge[1]?.isInnovatexAward ?? 0,
        judge2_comment: project.JudgeProjectBridge[1]?.comments ?? "no comment",

        judge3_name: project.JudgeProjectBridge[2]?.judge.name ?? "Unnamed",
        judge3_novelty_and_uniqueness_mark:
          project.JudgeProjectBridge[2]?.noveltyAndUniquenessMark ?? 0,
        judge3_benefit_to_mankind_mark: project.JudgeProjectBridge[2]?.benefitToMankindMark ?? 0,
        judge3_commercialization_mark: project.JudgeProjectBridge[2]?.commercializationMark ?? 0,
        judge3_status_of_invention_mark: project.JudgeProjectBridge[2]?.statusOfInventionMark ?? 0,
        judge3_video_presentation_mark: project.JudgeProjectBridge[2]?.videoPresentationMark ?? 0,
        judge3_supporting_document_mark: project.JudgeProjectBridge[2]?.supportingDocumentMark ?? 0,
        judge3_is_platinum_award: project.JudgeProjectBridge[2]?.isPlatinumAward ?? 0,
        judge3_is_sustainability_award: project.JudgeProjectBridge[2]?.isSustainabilityAward ?? 0,
        judge3_is_innovatex_award: project.JudgeProjectBridge[2]?.isInnovatexAward ?? 0,
        judge3_comment: project.JudgeProjectBridge[2]?.comments ?? "no comment",

        judge4_name: project.JudgeProjectBridge[3]?.judge.name ?? "Unnamed",
        judge4_novelty_and_uniqueness_mark:
          project.JudgeProjectBridge[3]?.noveltyAndUniquenessMark ?? 0,
        judge4_benefit_to_mankind_mark: project.JudgeProjectBridge[3]?.benefitToMankindMark ?? 0,
        judge4_commercialization_mark: project.JudgeProjectBridge[3]?.commercializationMark ?? 0,
        judge4_status_of_invention_mark: project.JudgeProjectBridge[3]?.statusOfInventionMark ?? 0,
        judge4_video_presentation_mark: project.JudgeProjectBridge[3]?.videoPresentationMark ?? 0,
        judge4_supporting_document_mark: project.JudgeProjectBridge[3]?.supportingDocumentMark ?? 0,
        judge4_is_platinum_award: project.JudgeProjectBridge[3]?.isPlatinumAward ?? 0,
        judge4_is_sustainability_award: project.JudgeProjectBridge[3]?.isSustainabilityAward ?? 0,
        judge4_is_innovatex_award: project.JudgeProjectBridge[3]?.isInnovatexAward ?? 0,
        judge4_comment: project.JudgeProjectBridge[3]?.comments ?? "no comment",

        judge5_name: project.JudgeProjectBridge[4]?.judge.name ?? "Unnamed",
        judge5_novelty_and_uniqueness_mark:
          project.JudgeProjectBridge[4]?.noveltyAndUniquenessMark ?? 0,
        judge5_benefit_to_mankind_mark: project.JudgeProjectBridge[4]?.benefitToMankindMark ?? 0,
        judge5_commercialization_mark: project.JudgeProjectBridge[4]?.commercializationMark ?? 0,
        judge5_status_of_invention_mark: project.JudgeProjectBridge[4]?.statusOfInventionMark ?? 0,
        judge5_video_presentation_mark: project.JudgeProjectBridge[4]?.videoPresentationMark ?? 0,
        judge5_supporting_document_mark: project.JudgeProjectBridge[4]?.supportingDocumentMark ?? 0,
        judge5_is_platinum_award: project.JudgeProjectBridge[4]?.isPlatinumAward ?? 0,
        judge5_is_sustainability_award: project.JudgeProjectBridge[4]?.isSustainabilityAward ?? 0,
        judge5_is_innovatex_award: project.JudgeProjectBridge[4]?.isInnovatexAward ?? 0,
        judge5_comment: project.JudgeProjectBridge[4]?.comments ?? "no comment",
      };

      return row;
    });

    const projectRows = projectRowsObj.map((projObj) =>
      Object.values(projObj).join(",")
    );

    const csvContent = [header.join(","), ...projectRows].join("\n");

    return new NextResponse(csvContent as any, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=projects.csv",
      },
    });
  } catch (error: any) {
    console.error(`Failed to export into CSV :${error}`);
    return NextResponse.json({ error }, { status: 500 });
  }
}
