import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectAndJudgeProjectBridge } from "@/util/type";
import React from "react";
import { useState } from "react";

const LeaderboardTableRow = ({
  project,
}: {
  project: ProjectAndJudgeProjectBridge;
}) => {

  const judgeProjectBridge = project.JudgeProjectBridge;
  const projectMarks = judgeProjectBridge.map((project) => {
    const totalMark =
      project.benefitToMankindMark! +
      project.commercializationMark! +
      project.noveltyAndUniquenessMark! +
      project.statusOfInventionMark! +
      project.supportingDocumentMark! +
      project.videoPresentationMark!;

    return totalMark;
  });

  const calculateAverageMark = () => {
    let isProjectNotFinishEvaluated = false;

    judgeProjectBridge.forEach((project) => {
      if (!project.isProjectMarked) {
        isProjectNotFinishEvaluated = true;
        return;
      }
    });

    if (isProjectNotFinishEvaluated) return "Waiting all juries ...";

    let totalMark = 0;
    let averageMark = 0;
    const totalProjectJudges = judgeProjectBridge.length;
    projectMarks.forEach((mark) => (totalMark += mark));

    averageMark = totalMark / totalProjectJudges;

    return averageMark;
  };

  const displayBadge = () => {
    const average = calculateAverageMark();

    if (typeof average === "string") return;

    if (average <= 30 && average >= 24) return <GoldBadge />;
    else if (average <= 23 && average >= 18) return <SilverBadge />;
    else return <BronzeBadge />;
  };

  return (
    <TableRow>
      <TableCell>{project.titleOfInnovation}</TableCell>
      <TableCell>{projectMarks[0] || "-"}</TableCell>
      <TableCell>{projectMarks[1] || "-"}</TableCell>
      <TableCell>{projectMarks[2] || "-"}</TableCell>
      <TableCell>{projectMarks[3] || "-"}</TableCell>
      <TableCell>{projectMarks[4] || "-"}</TableCell>
      <TableCell>
        {calculateAverageMark()} {displayBadge()}
      </TableCell>
      <TableCell>{}</TableCell>
    </TableRow>
  );
};

const GoldBadge = () => (
  <Badge className="bg-yellow-500 text-black mx-2">Gold</Badge>
);

const SilverBadge = () => (
  <Badge className="bg-slate-400 text-black mx-2">Silver</Badge>
);

const BronzeBadge = () => (
  <Badge className="bg-amber-950 text-white mx-2">Bronze</Badge>
);

export default LeaderboardTableRow;
